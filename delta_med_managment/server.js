import express from 'express'
import db from './db/db.js'
import path from 'path';
import { fileURLToPath } from 'url';
import { startAppointmentRemindersJob } from './cron/appointmentReminders.cron.js';
import cors from 'cors'
import staffRoutes from './routes/user.route.js'
import patientRoutes from './routes/patient.route.js';
import socialSecurityRoutes from './routes/socialSecurity.route.js';
import healthInsuranceRoutes from './routes/healthInsurance.route.js';
import secretaryFilesRoutes from './routes/secretaryFiles.route.js'
import trainerFilesRoutes from './routes/trainerFiles.route.js'
import primaryDoctorRoutes from './routes/primaryDoctor.route.js';
import appointmentRoutes from './routes/appointment.route.js';
import notificationRoutes from './routes/notification.route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(express.json())

const port = process.env.PORT

db()

app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}));

app.listen(port, () => {
    console.log(`Connecté sur port ${port}`)
})

startAppointmentRemindersJob()


// routes----------
app.use('/staff', staffRoutes)
app.use('/patient', patientRoutes);
app.use('/socialsecurity', socialSecurityRoutes);
app.use('/healthinsurance', healthInsuranceRoutes);
app.use('/secretaryfiles', secretaryFilesRoutes)
app.use('/trainerfiles', trainerFilesRoutes)
app.use('/primarydoctor', primaryDoctorRoutes);
app.use('/appointment', appointmentRoutes);
app.use('/notification', notificationRoutes);

app.use('/secretary_files', express.static(path.join(__dirname, 'secretary_files')));
app.use('/trainer_files', express.static(path.join(__dirname, 'trainer_files')));
