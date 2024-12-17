import styles from "./Caravaggio.module.css";
import styled from "styled-components";
import caravaggo from "../../assets/images/The_Calling_of_Saint_Matthew-Caravaggo.jpg";
import pointingFinger from "../../assets/images/PointingFinger.png";
import matthewsGesture from "../../assets/images/MatthewsGesture.png";
import rayOfLight from "../../assets/images/RayOfLight.png";

const cardData = [
  {
    src: pointingFinger,
    title: "Jesus' pointing finger",
    body: "Jesus' pointing finger is modeled on Michelangelo's famous depiction of the creation of Adam on the ceiling of the Sistine Chapel. What's surprising is that Jesus' hand is not modeled on God's hand, but Adam's. This is meant to show that Christ is the New Adam who redeems us from the first Adam's sin.",
  },
  {
    src: matthewsGesture,
    title: "Matthew's gestures",
    body: "Matthew's left hand is posed similarly to Christ's, but is directed back at himself. The message he is conveying to Jesus is, \"Really? You're choosing me?\" In contrast to this is the positioning of his right hand, which he reaches toward the money on the table. The two gestures appear to conflict with one another, and they reveal the struggle in Matthew's heart between his worldy attachments and the call of Jesus.",
  },
  {
    src: rayOfLight,
    title: "Ray of light",
    body: "This painting is a spectacular example of Caravaggio's defining chiaroscuro: a technique in which extreme contrast between light and shadow is used to draw the eye to key areas of the composition. In this painting, the ray of light above Christ's hand emphasizes the power and authority with which he summons Matthew from a life of comfort and greed.",
  },
];

const Page = styled.div`
  background-color: #dcdcdc;
  padding: 1em 6em;
  margin: 3em 15vw;
  border-radius: 1em;
  border: 1px solid #99641515;
`;

const TitleDiv = styled.div`
  padding: 1.5em 0 2em 0;
  text-align: center;
  font-family: "Esteban", serif;
  font-weight: bold;
  color: #996515;
  letter-spacing: 0.3em;
`;

const ImageDiv = styled.div`
  text-align: center;
`;

const ImageDescriptor = styled.div`
  margin-top: 2em;
`;

const ImageDescriptorAuthor = styled.p`
  font-weight: bold;
  display: inline;
  letter-spacing: 0.15em;
  margin-right: 0.5em;
`;

const ImageDescriptorTitle = styled.span`
  font-family: "Merriweather", serif;
  font-weight: 300;
  font-style: italic;
  margin: 0 0.5em;
`;

const ImageDescriptorDates = styled.span`
  font-family: "Merriweather", serif;
  font-style: italic;
  font-size: 0.8em;
  margin-left: 0.5em;
`;

const CardsDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3em;
`;
const CardDiv = styled.div`
  margin: 3em 0;
  margin-right: 1em;
`;
const CardImageDiv = styled.div`
  margin-bottom: 2em;
`;
const CardTextDiv = styled.div`
  font-family: "Noto Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
`;

// const CardHeader = styled.p`
//   font-weight: ${(props) => (props.isBold ? "700" : "300")};
// `;

const CardHeader = styled.p(
  ({ isBold }) => `
  font-weight: ${isBold ? "700" : "300"}`
);

const CardBody = styled.p``;

export default function Caravaggio() {
  console.log(cardData[0]);

  return (
    <>
      <Page>
        <TitleDiv>• VIA PULCHRITUDINIS •</TitleDiv>
        <ImageDiv>
          <img src={caravaggo} style={{ width: "100%", height: "auto" }}></img>
        </ImageDiv>
        <ImageDescriptor>
          <ImageDescriptorAuthor>CARAVAGGIO</ImageDescriptorAuthor>|
          <ImageDescriptorTitle>
            {" "}
            The Calling of Saint Matthew{" "}
          </ImageDescriptorTitle>
          |<ImageDescriptorDates>1599-1600</ImageDescriptorDates>
        </ImageDescriptor>

        <CardsDiv>
          <Card cardData={cardData[0]}></Card>
          <Card cardData={cardData[1]}></Card>
          <Card cardData={cardData[2]}></Card>
        </CardsDiv>
      </Page>
    </>
  );
}

function Card({ cardData }) {
  return (
    <CardDiv>
      <CardImageDiv>
        <img
          src={cardData.src}
          style={{
            width: "60%",
            height: "auto",
            aspectRatio: "1",
            borderRadius: "50%",
          }}
        ></img>
      </CardImageDiv>
      <CardTextDiv>
        <CardHeader isBold>{cardData.title}</CardHeader>
        <CardBody>{cardData.body}</CardBody>
      </CardTextDiv>
    </CardDiv>
  );
}
