const Storage = {
    KEYS: {
        DISCUSSIONS: 'vb_discussions',
        MASTER_PROMPT: 'vb_master_prompt',
        API_KEY: 'vb_api_key',
        SPEECH_RATE: 'vb_speech_rate',
    },

    getDiscussions() {
        const data = localStorage.getItem(this.KEYS.DISCUSSIONS);
        return data ? JSON.parse(data) : [];
    },

    saveDiscussions(discussions) {
        localStorage.setItem(this.KEYS.DISCUSSIONS, JSON.stringify(discussions));
    },

    getDiscussion(id) {
        const discussions = this.getDiscussions();
        return discussions.find(d => d.id === id) || null;
    },

    createDiscussion() {
        const discussions = this.getDiscussions();
        const discussion = {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
            title: '',
            agenda: '',
            qaPairs: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        discussions.unshift(discussion);
        this.saveDiscussions(discussions);
        return discussion;
    },

    updateDiscussion(id, updates) {
        const discussions = this.getDiscussions();
        const index = discussions.findIndex(d => d.id === id);
        if (index === -1) return null;
        discussions[index] = {
            ...discussions[index],
            ...updates,
            updatedAt: new Date().toISOString(),
        };
        this.saveDiscussions(discussions);
        return discussions[index];
    },

    deleteDiscussion(id) {
        const discussions = this.getDiscussions();
        const filtered = discussions.filter(d => d.id !== id);
        this.saveDiscussions(filtered);
    },

    getMasterPrompt() {
        return localStorage.getItem(this.KEYS.MASTER_PROMPT) || '';
    },

    saveMasterPrompt(prompt) {
        localStorage.setItem(this.KEYS.MASTER_PROMPT, prompt);
    },

    getApiKey() {
        return localStorage.getItem(this.KEYS.API_KEY) || '';
    },

    saveApiKey(key) {
        localStorage.setItem(this.KEYS.API_KEY, key);
    },

    getSpeechRate() {
        return parseFloat(localStorage.getItem(this.KEYS.SPEECH_RATE)) || 1.0;
    },

    saveSpeechRate(rate) {
        localStorage.setItem(this.KEYS.SPEECH_RATE, rate.toString());
    },
};
