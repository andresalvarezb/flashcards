import './App.css';
import Button from '../components/Button';
import NavbarTopics from '../components/NavbarTopics';
import SectionCards from '../components/SectionCards';
import Card from '../components/Card';
import Modal from '../components/Modal';
import CardForm from '../components/CardForm';
import HeaderContainerButton from '../components/HeaderContainerButton';


function AppUI({ openModal, infoCard, dataBaseCards, dataBaseFilterCards, handleChange, createCard, handleClickModal, allCards, deleteCard, getCardByTopic }) {

    return (
        <main className='main'>
            <HeaderContainerButton>
                <Button onClick={handleClickModal} >Add</Button>
            </HeaderContainerButton>
            <NavbarTopics>
                <li onClick={allCards} >All</li>
                {
                    dataBaseCards.map(el => (
                        <li key={el.topic} onClick={() => getCardByTopic(el.topic)} > {el.topic}</li>
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
