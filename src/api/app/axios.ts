import config from '@/config'
import Axios from 'axios'

export const axios = Axios.create({
    baseURL: config.backendUrl,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true
})
