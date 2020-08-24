export default {
    local: {
        timezone: { 
            get: () => JSON.parse(localStorage.getItem('tz')),
            set: (val) => localStorage.setItem('tz', JSON.stringify(val))
        },
        align: {
            get: () => localStorage.getItem('align'),
            set: (val) => localStorage.setItem('align', val)
        }
    },
    session:{},
}