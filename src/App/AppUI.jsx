import { useState } from 'react';
import './App.css';
import Button from '../components/Button';
import NavbarTopics from '../components/NavbarTopics';
import SectionCards from '../components/SectionCards';
import Card from '../components/Card';
import Modal from '../components/Modal';
import CardForm from '../components/CardForm';
import HeaderContainerButton from '../components/HeaderContainerButton';

const initialData = {
    id: null,
    topic: '',
    question: '',
    answer: '',
}

const initialCard = {
    question: 'Please, double click on me',
    answer: 'Yeah!! In this way I work',
}


function AppUI() {
    const [openModal, setOpenModal] = useState(false)
    const [dataCard, setDataCard] = useState(initialData)
    const [dataBaseCards, setDataBaseCards] = useState([initialCard])
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

    console.log(dataBaseCards);
    return (
        <main className='main'>
            <HeaderContainerButton>
                <Button onClick={handleClick} >Add</Button>
            </HeaderContainerButton>
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
