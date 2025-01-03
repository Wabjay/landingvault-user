"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const axios_1 = __importDefault(require("@/lib/axios"));
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
// Create a custom storage object that adheres to PersistStorage<Store>
const customStorage = {
    getItem: (name) => {
        const item = typeof window !== "undefined" ? localStorage.getItem(name) : null;
        return item ? JSON.parse(item) : null;
    },
    setItem: (name, value) => {
        if (typeof window !== "undefined") {
            localStorage.setItem(name, JSON.stringify(value));
        }
    },
    removeItem: (name) => {
        if (typeof window !== "undefined") {
            localStorage.removeItem(name);
        }
    },
};
const initialPageData = {
    _id: "",
    pageImage: "",
    pageCoverImage: "",
    brandName: "",
    brandDescription: "",
    websiteUrl: "",
    componentType: [],
    industry: [],
    stacks: [],
    style: [],
    type: [],
    mode: "light", // Default mode can be "light" or "dark"
    colorPalette: [],
    createdAt: "",
    updatedAt: "",
    __v: 0,
    id: "",
};
// Initial state setup
const initialState = {
    loading: false,
    componentLoading: false,
    overlayLoading: false,
    token: "",
    link: "/pitch-decks",
    users: { data: [] },
    components: { data: [] },
    industries: { data: [] },
    stacks: { data: [] },
    styles: { data: [] },
    types: { data: [] },
    user: {},
    SingleData: {},
    isLogged: false,
    showLogin: false,
    showData: false,
    tags: [],
    images: [],
    loadedPages: {
        data: [],
        message: "",
        status: 0,
        pagination: { total: 0, page: 0, pages: 0 },
    },
    page: {
        data: [initialPageData], // Start with an array containing the initial page data
        status: false,
        statusCode: 0,
        message: "",
        errors: null,
    },
    error: null,
    // users: [],
    // components: [],
    // industries: [],
    // stacks: [],
    // styles: [],
    // types: [],
    pages: [],
    submitWebsite: false,
    subscribe: false,
    promoteProduct: false,
    hydrated: false,
    searchedPages: [],
    showSearch: false,
    searchInput: ""
};
// Helper function for API requests
const fetchData = async (url, setState, stateKey) => {
    try {
        const response = await axios_1.default.get(url);
        setState({ [stateKey]: response.data, loading: false });
    }
    catch (error) {
        console.error("Error fetching data:", error);
        setState({ [stateKey]: [], loading: false });
        setState({ error: "Failed to fetch data" }); // Set error in the store
    }
};
exports.store = (0, zustand_1.create)(middleware_1.persist((set, get) => (Object.assign(Object.assign({}, initialState), { resetState: () => set(() => initialState), setToken: (token) => set({ token }), setHydrated: (status) => set({ hydrated: status }), setShowLogin: (show) => set({ showLogin: show }), setShowData: (show) => set({ showData: show }), setSearch: (value) => (value !== "" ? set({ showSearch: true, searchInput: value }) : set({ showSearch: false, searchInput: "" })), setIsLoggedin: (status) => set({ isLogged: status }), setIsLoading: (status) => set({ loading: status }), setIsComponentLoading: (status) => set({ componentLoading: status }), setIsOverlayLoading: (status) => set({ overlayLoading: status }), setSubmitWebsite: (status) => set({ submitWebsite: status }), setSubscribe: (status) => set({ subscribe: status }), setPromoteProduct: (status) => set({ promoteProduct: status }), 
    // setTags: (tags) => set({ tags }),
    setImages: (images) => set({ images }), setError: (message) => set({ error: message }), fetchUsers: () => fetchData("/user", set, "users"), fetchComponents: async () => await fetchData("/components", set, "components"), fetchIndustries: () => fetchData("/industry", set, "industries"), fetchStacks: () => fetchData("/stack", set, "stacks"), fetchTypes: () => fetchData("/type", set, "types"), fetchStyles: () => fetchData("/style", set, "styles"), fetchAllPages: async () => {
        // const token = () => get().token
        set({ componentLoading: true });
        try {
            await axios_1.default
                .get(`/page`)
                .then(function (response) {
                set({ loadedPages: response.data, componentLoading: false });
                console.log(response.data);
            });
        }
        catch (error) {
            console.error("Error fetching Data:", error);
            set({ componentLoading: false }); // Corrected from `loading: false`
        }
    }, fetchPages: async (response) => {
        // console.log(response)
        set({ pages: response });
    }, fetchSearchedPages: async (response) => {
        // console.log(response)
        set({ searchedPages: response });
    }, fetchSinglePage: async (title) => {
        console.log(title);
        set({ componentLoading: true });
        try {
            await axios_1.default
                .get(`/page/name/${title}`)
                .then(function (response) {
                set({ page: response.data, componentLoading: false });
                console.log(response.data);
            });
        }
        catch (error) {
            console.error("Error fetching Data:", error);
            set({ componentLoading: false }); // Corrected from `loading: false`
        }
    }, fetchSingle: async (id, type) => {
        // const token = () => get().token
        set({ componentLoading: true });
        try {
            await axios_1.default
                .get(`/${type}/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${get().token}`,
                },
            })
                .then(function (response) {
                set({ SingleData: response.data, componentLoading: false });
                console.log(response.data);
            });
        }
        catch (error) {
            console.error("Error fetching Data:", error);
            set({ componentLoading: false }); // Corrected from `loading: false`
        }
    } })), {
    name: "app-storage", // Name of the storage key
    storage: customStorage, // Use custom storage implementation 
    onRehydrateStorage: () => (state) => {
        // Mark hydration as complete after rehydration
        state === null || state === void 0 ? void 0 : state.setHydrated(true);
    },
}));
