import dotenv from 'dotenv'

dotenv.config()

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env

const DB_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?authSource=admin`
export default DB_URI
