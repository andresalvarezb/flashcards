import { useState } from 'react';
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

    const handleClick = () => {
        setOpenModal(!openModal)
    }

    const handleChange = (e) => {
        setDataCard({
            ...dataCard,
            [e.target.name] : e.target.value
        })
    }

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

    console.log(dataBaseCards);
    return (
        <main className='main'>
            <header className='containerButton'>
                <Button onClick={handleClick} >Add</Button>
            </header>
            <NavbarTopics />
            <SectionCards>
                {
                    dataBaseCards.map(el => (
                        <Card index={el.id} question={el.question} answer={el.answer} />
                    ))
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
