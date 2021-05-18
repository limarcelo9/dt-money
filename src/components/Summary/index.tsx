import incomeImg from '../../assets/income.svg'
import outComeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { useContext } from 'react'
import { Container } from "./styles";
import { TransactionsContext } from '../../TransactionsContext';

export function Summary() {

  const {transactions} = useContext(TransactionsContext)

  console.log(transactions)

  const summary = transactions.reduce((acc, transaction) => {
    
    if(transaction.type === 'deposit'){
      acc.deposits += parseFloat(''+transaction.amount);
      acc.total += parseFloat(''+transaction.amount);
    }else {
      acc.withdraws += parseFloat(''+transaction.amount);
      acc.total -= parseFloat(''+transaction.amount);
    }
    
    return acc;
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0,
  });

  console.log(summary)

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas"/>
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.deposits)}
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outComeImg} alt="Saídas"/>
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.withdraws)}
        </strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total"/>
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.total)}
        </strong>
      </div>

    </Container>
  );
}