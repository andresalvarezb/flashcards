import React, { useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import AppUI from './AppUI'

const initialData = {
    topic: '',
    question: '',
    answer: ''
}

function App() {
    const [openModal, setOpenModal] = useState(false)
    const [infoCard, setInfoCard] = useState(initialData)
    const [dbCards, saveDbCards] = useLocalStorage('CARDS_V1', []);
    const [listOfCardsFilter, setListOfCardsFilter] = useState([])

    const handleClickModal = () => {
        setOpenModal(!openModal)
        setInfoCard(initialData)
    }

    const handleChange = (e) => {
        const newInfoCard = {
            ...infoCard,
            [e.target.name]: e.target.value,
        }
        setInfoCard(newInfoCard)
    }

    // CRUD
        const createCard = (card) => {
        const existTopic = dbCards.find(el => el.topic === card.topic.toLowerCase())
        const id = Date.now();

        if (existTopic) {
            existTopic.cards.push({
                id: id,
                question: card.question,
                answer: card.answer
            })
        } else {
            const newCard = [
                ...dbCards,
                {
                    topic: card.topic.toLowerCase(),
                    cards: [
                        {
                            id: id,
                            question: card.question.toUpperCase(),
                            answer: card.answer.toLowerCase()
                        }
                    ]
                }
            ]
            saveDbCards(newCard)
        }
        setInfoCard(initialData)
        setOpenModal(false)
    }

    const deleteCard = (card) => {
        const newDbCards = [...dbCards]

        // delete card from object
        const getTopic = newDbCards.find(el => el.cards)
        const newTopic = { ...getTopic }
        const newCardsByTopic = newTopic.cards.filter(el => el.id !== card.id);
        newTopic.cards = [...newCardsByTopic]

        // delete the original object
        const indexTopic = newDbCards.findIndex(el => el.cards);
        newDbCards.splice(indexTopic, 1)

        if (newTopic.cards.length === 0) {
            saveDbCards(newDbCards)
        } else {
            // add new object with cards update
            newDbCards.push(newTopic)
            saveDbCards(newDbCards)
        }
    }

    const getCardByTopic = (topic) => {
        const newCardList = dbCards.filter(card => card.topic === topic)
        setListOfCardsFilter(newCardList)
    }

    const getCards = () => {
        setListOfCardsFilter([])
    }


    return (
        <AppUI
            openModal={openModal}
            infoCard={infoCard}
            dbCards={dbCards}
            listOfCardsFilter={listOfCardsFilter}
            handleClickModal={handleClickModal}
            handleChange={handleChange}
            createCard={createCard}
            deleteCard={deleteCard}
            getCardByTopic={getCardByTopic}
            getCards={getCards}
        />
    )
}

export default App
