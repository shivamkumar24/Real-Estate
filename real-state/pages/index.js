import Link from "next/link";
import Image from "next/image";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { API, baseURL } from "../utils/API";
import Property from "@/components/Property";

const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  buttonText,
  linkName,
  imageURL,
}) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageURL} width={500} height={300} alt="banner" />
    <Box p={5}>
      <Text fontSize="sm" fontWeight="medium" color="gray.500">
        {purpose}
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        {title1}
        <br />
        {title2}
      </Text>
      <Text fontSize="lg" paddingTop={3} paddingBottom={3} color="gray.700">
        {desc1}
        <br />
        {desc2}
      </Text>
      <Button fontSize="xl">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);

export default function Home({ propertiesForSale, propertiesForRent }) {
  console.log("PropertiesForRent Data: ", propertiesForRent);
  console.log("PropertiesForSale Data: ", propertiesForSale);

  return (
    <Box>
      <h1>Hello World</h1>
      {/* <------------------- Rent -----------------> */}
      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes for"
        title2="Everyone"
        desc1=" Explore from Apartments, builder floors, villas"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageURL="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />

      {/* <------------ fetch the rent data -----------> */}
      <Flex flexWrap="wrap">
        {propertiesForRent?.map((el) => (
          <Property property={el} key={el.id} />
        ))}
      </Flex>

      {/* <------------------- Buy -----------------> */}
      <Banner
        purpose="BUY A HOME"
        title1=" Find, Buy & Own Your"
        title2="Dream Home"
        desc1=" Explore from Apartments, land, builder floors,"
        desc2=" villas and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageURL="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />

      {/* <------------ fetch the buy data -----------> */}
      <Flex flexWrap="wrap">
        {propertiesForSale?.map((el) => (
          <Property property={el} key={el.id} />
        ))}
      </Flex>
    </Box>
  );
}

export async function getStaticProps() {
  const propertyForSale = await API(
    `${baseURL}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertyForRent = await API(
    `${baseURL}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}
