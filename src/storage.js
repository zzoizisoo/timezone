export default {
    local: {
        timezone: { 
            get: () => JSON.parse(localStorage.getItem('tz')),
            set: (val) => localStorage.setItem('tz', JSON.stringify(val))
        }
    },
    session:{},
}