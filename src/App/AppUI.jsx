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
    topic: '',
    question: '',
    answer: ''
    // cards: [
    //     { question: '', answer: '' }
    // ]
}
function AppUI() {
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
        const existTopic = dataBaseCards.find(el => el.topic === card.topic)

        if (existTopic) {
            existTopic.cards.push({
                question: card.question,
                answer: card.answer
            })
        } else {
            const newCard = [
                ...dataBaseCards,
                {
                    topic: card.topic,
                    cards: [
                        {
                            question: card.question,
                            answer: card.answer
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
                <Button onClick={handleClickModal} >Add</Button>
            </HeaderContainerButton>
            <NavbarTopics>
                {/* <li onClick={''} >All</li>*/}
                {
                    dataBaseCards.map(el => (
                        <li key={el.topic} onClick={() => getCardByTopic(el.topic)}  > {el.topic}</li>
                    ))
                }
            </NavbarTopics>
            <SectionCards>
                {
                    ((dataBaseFilterCards.length === 0 ?
                        dataBaseCards :
                        dataBaseFilterCards).map((el, index) => {
                            return el.cards.map((card, index) => <Card key={index} el={card} deleteCard={deleteCard} />)
                        })
                    )
                }
            </SectionCards>
            {
                openModal && (
                    <Modal>
                        <CardForm
                            handleClick={handleClickModal}
                            infoCard={infoCard}
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
