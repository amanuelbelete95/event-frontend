import { Badge, Text, Card, CardBody, CardHeader, Flex, Heading, VStack, Box, Icon, HStack, Divider, useColorModeValue, Button, Stack } from "@chakra-ui/react"
import { CalendarIcon, TimeIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { FiMapPin } from "react-icons/fi"
import { Event, EventAPIResponse } from "../events.type"
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/dateUtility";
import { EventDesignSystem } from "../designSystem";

interface EventCardProps {
    event: EventAPIResponse;
}

const EventCard = (props: EventCardProps) => {
    const { event } = props
    const navigate = useNavigate();

    const formatTime = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }
    return (
        <Box
            borderRadius="xl"
            overflow="hidden"
            boxShadow="lg"
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            _hover={{
                transform: 'translateY(-4px)',
                boxShadow: 'xl',
            }}
            border="1px"
        >
            <Card
                p={4}
                position="relative"
                overflow="hidden"
            >
                <Box
                    position="absolute"
                    top="-20"
                    right="-20"
                    w="40"
                    h="40"
                    bg="white"
                    opacity="10"
                    borderRadius="full"
                />
                <Stack direction="row" justify="space-between" align="flex-start">
                    <Box flex={1}>
                        <Heading
                            size="md"
                            color="gray"
                            fontWeight="bold"
                            noOfLines={2}
                            mb={2}
                        >
                            {event.name}
                        </Heading>
                        <Badge
                            variant="outline"
                            fontSize="xs"
                            colorScheme="#389999"
                            textTransform="uppercase"
                        >
                            {event.event_status || "todo"}
                        </Badge>
                    </Box>
                </Stack>
                <CardBody p={6}>
                    {event.description && (
                        <Text
                            fontSize="sm"
                            color="gray.600"
                            noOfLines={3}
                            mb={4}
                            lineHeight="1.5"
                        >
                            {event.description}
                        </Text>
                    )}

                    {/* Event Details */}
                    <VStack spacing={3} align="stretch" mb={4}>
                        <HStack spacing={3}>
                            <Icon
                                as={CalendarIcon}
                                color="blue.500"
                                boxSize={4}
                                flexShrink={0}
                            />
                            <Text fontSize="sm" fontWeight="500">
                                {formatDate(event.event_date)}
                            </Text>
                        </HStack>

                        <HStack spacing={3}>
                            <Icon
                                as={TimeIcon}
                                color="green.500"
                                boxSize={4}
                                flexShrink={0}
                            />
                            <Text fontSize="sm" fontWeight="500">
                                {formatTime(event.event_date)}
                            </Text>
                        </HStack>

                        <HStack spacing={3}>
                            <Icon
                                as={FiMapPin}
                                color="red.500"
                                boxSize={4}
                                flexShrink={0}
                            />
                            <Text fontSize="sm" fontWeight="500" noOfLines={1}>
                                {event.location}
                            </Text>
                        </HStack>
                    </VStack>

                    <Divider my={4} />

                    <Button
                        rightIcon={<ChevronRightIcon />}
                        bg={EventDesignSystem.primaryColor}
                        color="white"
                        variant="outline"
                        size="sm"
                        w="full"
                        onClick={() => navigate(`/events/${event.event_id}/detail`)}
                    >
                        View Details
                    </Button>
                </CardBody>
            </Card>


        </Box>
    )
}

export default EventCard;