export default class {
    constructor(url) {
        this.url = url
    }

    async query(query) {
        const r = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query })
        })
        return (await r.json()).data
    }
}