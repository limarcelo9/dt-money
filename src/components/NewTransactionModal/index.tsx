import { FormEvent, useState, useContext } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { TransactionsContext } from '../../TransactionsContext';
import { Container, TrnsactionTypeContainer, RadioBox} from './styles'

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps){

  const { createTransaction } = useContext(TransactionsContext);
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('deposit');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type,
    })

    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');
    onRequestClose();
  }

  return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >

        <button 
          type="button" 
          onClick={onRequestClose} 
          className="react-modal-close" 
        >
          <img src={closeImg} alt="Fechar Modal" />
        </button>

        <Container onSubmit={handleCreateNewTransaction}>
          <h2>Cadastrar transação</h2>

          <input 
            placeholder="Título"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />

          <input 
            type="number"
            placeholder="Valor"
            value={amount}
            onChange={event => setAmount(Number(event.target.value))}
          />

          <TrnsactionTypeContainer>
            <RadioBox
              type="button"
              onClick={() => {setType('deposit'); }}
              isActive={ type === 'deposit'} 
              activeColor="green"
            >
              <img src={incomeImg} alt="Entradas" />
              <span>Entrada</span>
            </RadioBox>

            <RadioBox
              type="button"
              onClick={() => {setType('withdraw'); }}
              isActive={ type === 'withdraw'}
              activeColor="red"            
            >
              <img src={outcomeImg} alt="Saídas" />
              <span>Saída</span>
            </RadioBox>
          </TrnsactionTypeContainer>

          <input 
            placeholder="Categoria"
            value={category}
            onChange={event => setCategory(event.target.value)}
          />

          <button 
            type="submit"
          >
            Cadastrar
          </button>
        </Container>
      </Modal>
  );
}