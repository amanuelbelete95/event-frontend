export const EVENTS_ROUTES = {
    BASE: {
        RELATIVE: "events",
        ABSOLUTE: "/events"
    },
    EVENTS_NEW: {
        ABSOLUTE: '/events/new',
        RELATIVE: 'new'
    },

    EVENTS_EDIT: {
        ABSOLUTE: '/events/edit/:id',
        RELATIVE: '/edit/:id',
        getRelativeLink: (id: string) => `edit/${id}`,
        getAbsoluteLink: (id: string) => `/events/edit/${id}`
    },

    EVENTS_DETAIL: {
        ABSOLUTE: '/events/detail/:id',
        RELATIVE: '/detail/:id',
        getRelativeLink: (id: string) => `details/${id}`,
        getAbsoluteLink: (id: string) => `/events/detail/${id}`
    },

    EVENTS_REMOVE: {
        ABSOLUTE: '/events/delete/:id',
        RELATIVE: '/delete/:id',
        getRelativeLink: (id: string) => `delete/${id}`,
        getAbsoluteLink: (id: string) => `/events/delete/${id}`
    }
}