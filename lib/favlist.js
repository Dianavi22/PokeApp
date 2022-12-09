import SyncStorage from "sync-storage"

SyncStorage.init()

const storageName = 'favlist'

function getList() {
    return SyncStorage.get(storageName)?.split(',').map(e => +e) ?? []
}

function add(id) {
    const list = getList()
    list.push(id)
    SyncStorage.set(storageName, list.join(','))
}

function remove(id) {
    const list = getList()
    const index = list.indexOf(id)
    list.splice(index, 1)
    SyncStorage.set(storageName, list.join(','))
}

function contains(id) {
    return getList().includes(id)
}

export default {
    getList,
    add,
    remove,
    contains
}