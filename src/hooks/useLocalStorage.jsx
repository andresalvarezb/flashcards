import {useState} from 'react'

function useLocalStorage(key, value) {
    const LS = localStorage
    const itemLS = JSON.parse(LS.getItem(key))
    let parsedItem

    if (itemLS) {
        parsedItem = JSON.parse(LS.getItem(key))

    } else {
        LS.setItem(key, JSON.stringify(value))
        parsedItem = value
    }

    const [item, setItem] = useState(parsedItem)

    const saveItem = (newItem) => {
        const stringifyItem = JSON.stringify(newItem)
        localStorage.setItem(key, stringifyItem);
        setItem(newItem)
    }

    return [
        item,
        saveItem
    ]
}

export default useLocalStorage
