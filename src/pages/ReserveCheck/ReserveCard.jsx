/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/index";
import * as Styled from "./styles";

const ReserveCard = ({ card }) => {
  const navigate = useNavigate();

  const handleReserve = async () => {
    const reservationData = {
      data_ida: card.data_ida,
      data_volta: card.data_volta,
      origem: card.origem,
      destino: card.destino,
      tipo: card.tipo,
    };

    try {
      const response = await fetch("http://localhost:3000/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData),
      });
      if (!response.ok) throw new Error("Erro ao enviar dados da reserva");
      navigate("/reservas/finish");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Styled.Card>
      <div>
        <Styled.Image src={card.imagem} alt={card.alt} />
        <Styled.Infos>
          <div>
            <Styled.Paragraph>Data de ida: {card.data_ida}</Styled.Paragraph>
            <Styled.Paragraph>
              Data de volta: {card.data_volta}
            </Styled.Paragraph>
            <Styled.Paragraph>Origem: {card.origem}</Styled.Paragraph>
            <Styled.Paragraph>Destino: {card.destino}</Styled.Paragraph>
            <Styled.Paragraph>Tipo: {card.tipo}</Styled.Paragraph>
          </div>
        </Styled.Infos>
      </div>
      <Styled.Divisor />
      <div>
        <Styled.Heading2>Valor final</Styled.Heading2>
        <Styled.Price>R$ {card.valor}</Styled.Price>
        <Button onClick={handleReserve}>Concluir reserva</Button>
      </div>
    </Styled.Card>
  );
};

export default ReserveCard;
