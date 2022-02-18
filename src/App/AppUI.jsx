import { useState, useEffect } from 'react';
import './App.css';
import Button from '../components/Button';
import NavbarTopics from '../components/NavbarTopics';
import SectionCards from '../components/SectionCards';
import Card from '../components/Card';
import Modal from '../components/Modal';
import CardForm from '../components/CardForm';

const initialData = {
    id: null,
    topic: '',
    question: '',
    answer: '',
}

function AppUI() {
    const [openModal, setOpenModal] = useState(false)
    const [dataCard, setDataCard] = useState(initialData)
    const [dataBaseCards, setDataBaseCards] = useState([])
    const [dataBaseFilterCards, setDataBaseFilterCards] = useState([])

    const handleClick = () => {
        setOpenModal(!openModal)
        setDataCard(initialData)
    }

    const handleChange = (e) => {
        setDataCard({
            ...dataCard,
            [e.target.name]: e.target.value
        })
    }

    // CRUD
    const createCard = (card) => {
        card.id = Date.now()
        setDataBaseCards([
            ...dataBaseCards,
            {
                ...card,
            }
        ])
        setDataCard(initialData)
        setOpenModal(false)
    }

    const deleteCard = (card) => {
        const newListOfCards = dataBaseCards.filter(el => el.id !== card.id)
        setDataBaseCards(newListOfCards)
    }

    const getCardByTopic = (topic) => {
        const newListOfCards = dataBaseCards.filter(card => card.topic === topic)
        setDataBaseFilterCards(newListOfCards)
    }

    // const getAllCards = () => {
    //     setDataBaseCards(dataBaseCards)
    // }

    // useEffect(() => {
    //     setCopyDataBaseCards(...dataBaseCards)
    // }, [dataBaseCards])

    console.log(dataBaseCards);
    return (
        <main className='main'>
            <header className='containerButton'>
                <Button onClick={handleClick} >Add</Button>
            </header>
            <NavbarTopics>
                <li onClick={''} >All</li>
                {
                    dataBaseCards.map(el => (
                        <li key={el.id} onClick={() => getCardByTopic(el.topic)} > {el.topic}</li>
                    ))
                }
            </NavbarTopics>
            <SectionCards>
                {
                    ((dataBaseFilterCards.length === 0 ?
                        dataBaseCards :
                        dataBaseFilterCards).map(el => (<Card key={el.id} el={el} deleteCard={deleteCard} />))
                    )
                }
            </SectionCards>
            {
                openModal && (
                    <Modal>
                        <CardForm
                            handleClick={handleClick}
                            dataCard={dataCard}
                            handleChange={handleChange}
                            createCard={createCard}
                        />
                    </Modal>
                )
            }

        </main>
    );
}

export default AppUI;
