import React, { useState } from 'react'
import AppUI from './AppUI'

const initialData = {
    topic: '',
    question: '',
    answer: ''
    // cards: [
    //     { question: '', answer: '' }
    // ]
}

function App() {
    const [openModal, setOpenModal] = useState(false)
    const [infoCard, setInfoCard] = useState(initialData)
    const [dataBaseCards, setDataBaseCards] = useState([])
    const [dataBaseFilterCards, setDataBaseFilterCards] = useState([])

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
        const existTopic = dataBaseCards.find(el => el.topic === card.topic.toLowerCase())
        const id = Date.now();

        if (existTopic) {
            existTopic.cards.push({
                id: id,
                question: card.question,
                answer: card.answer
            })
        } else {
            const newCard = [
                ...dataBaseCards,
                {
                    topic: card.topic.toLowerCase(),
                    cards: [
                        {
                            id: id,
                            question: card.question.toLowerCase(),
                            answer: card.answer.toLowerCase()
                        }
                    ]
                }
            ]
            setDataBaseCards(newCard)
        }
        setInfoCard(initialData)
        setOpenModal(false)
    }

    const deleteCard = (card) => {
        const copyDataBase = [...dataBaseCards]

        // delete card from object
        const getObjectByTopic = copyDataBase.find(el => el.cards)
        const copyOfObjectByTopic = { ...getObjectByTopic }
        const cardsByTopic = copyOfObjectByTopic.cards;
        const newListOfCardsByTopic = cardsByTopic.filter(el => el.id !== card.id);
        copyOfObjectByTopic.cards = [...newListOfCardsByTopic]

        // delete the original object
        const indexObjectByTopic = copyDataBase.findIndex(el => el.cards);
        copyDataBase.splice(indexObjectByTopic, 1)

        if (copyOfObjectByTopic.cards.length === 0) {
            setDataBaseCards(copyDataBase)
        } else {
            // add new object with cards update
            copyDataBase.push(copyOfObjectByTopic)
            console.log(copyDataBase);
            setDataBaseCards(copyDataBase)
        }
    }

    const getCardByTopic = (topic) => {
        const newListOfCards = dataBaseCards.filter(card => card.topic === topic)
        setDataBaseFilterCards(newListOfCards)
    }

    const allCards = () => {
        setDataBaseFilterCards([])
    }

    return (
        <AppUI
            openModal={openModal}
            infoCard={infoCard}
            dataBaseCards={dataBaseCards}
            dataBaseFilterCards={dataBaseFilterCards}
            handleClickModal={handleClickModal}
            handleChange={handleChange}
            createCard={createCard}
            deleteCard={deleteCard}
            getCardByTopic={getCardByTopic}
            allCards={allCards}
        />
    )
}

export default App
