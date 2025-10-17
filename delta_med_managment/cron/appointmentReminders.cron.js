import cron from 'node-cron';
import Appointment from '../models/appointment.model.js';
import Notification from '../models/notification.model.js';

// Util: bornes début/fin de journée pour une date donnée (Europe/Paris)
function dayBounds(date) {
  // on calcule en local (serveur) – si besoin, ajuste avec luxon/date-fns-tz
  const start = new Date(date); start.setHours(0, 0, 0, 0);
  const end   = new Date(date); end.setHours(23, 59, 59, 999);
  return { start, end };
}

export function startAppointmentRemindersJob() {
  // Tous les jours à 03:00 heure de Paris
  cron.schedule('44 11 * * *', async () => {
    try {
      const now = new Date();
      const fiveDaysLater = new Date(now);
      fiveDaysLater.setDate(now.getDate() + 5);

      const { start, end } = dayBounds(fiveDaysLater);

      // 1) On récupère les RDV dont la date est dans le jour J+5
      const appts = await Appointment.find({
        date: { $gte: start, $lte: end }
      }).select('_id patient secretary'); // minimal

      if (!appts.length) return;

      // 2) Pour chacun, on crée une notification si absente (idempotent)
      //    On utilise un upsert pour éviter les doublons sans changer le schéma
      const ops = appts.map(a => ({
        updateOne: {
          filter: { appointment: a._id }, // 1 notif par RDV
          update: {
            $setOnInsert: {
              appointment: a._id,
              patient: a.patient,
              secretary: a.secretary
            }
          },
          upsert: true
        }
      }));

      await Notification.bulkWrite(ops, { ordered: false });
      console.log(`[reminder-5d] Notifications upserted: ${appts.length}`);

    } catch (err) {
      console.error('[reminder-5d] Job error:', err);
    }
  }, { timezone: 'Europe/Paris' });
}