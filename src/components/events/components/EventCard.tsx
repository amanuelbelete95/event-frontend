import { Badge, Text, Card, CardBody, CardHeader, Flex, Heading, VStack, Box } from "@chakra-ui/react"
import { Event } from "../events.type"

interface EventCardProps {
    event: Event;
}

const EventCard = (props: EventCardProps) => {
    const { event } = props
    return (
        <Box boxShadow={"md"}>
            <Card
                borderRadius={"lg"}
                overflow="hidden"
                bg="white"
                padding={8}
                display={"flex"}
                flexDirection={"column"}
            >
                <CardHeader>
                    <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                        <Heading size="lg" fontWeight="semibold">
                            {event.name}
                        </Heading>
                        <Text fontSize="sm" color="gray.600" noOfLines={2} mt={2} p={2} bg="gray.50" borderRadius="md">
                            {event.description}
                        </Text>
                    </Box>
                </CardHeader>
                <CardBody>
                    <VStack align="start" spacing={2}>
                        <Text fontSize="sm" color="gray.600" fontWeight="medium">
                            <strong>Location:</strong> {event.location}
                        </Text>
                        <Text fontSize="sm" color="gray.600" fontWeight="medium">
                            <strong>Date:</strong> {new Date(event.event_date).toLocaleDateString()}
                        </Text>
                    </VStack>
                </CardBody>
            </Card>
        </Box>
    )
}

export default EventCard;