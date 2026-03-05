import { Badge, Text, Card, CardBody, CardHeader, Flex, Heading, VStack, Box, Icon, HStack, Divider, useColorModeValue, Button, Stack, useToast } from "@chakra-ui/react"
import { CalendarIcon, TimeIcon } from "@chakra-ui/icons"
import { FiMapPin } from "react-icons/fi"
import { Event, EventAPIResponse } from "../events.type"
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/dateUtility";
import { PermissionGuard } from "../../PermissionGuard";
import { EventDesignSystem } from "../designSystem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onDelete } from "../api/deleteEvents";
import { memo, useCallback } from "react";

interface EventCardProps {
    event: EventAPIResponse;
    onDeleteEvent: (id: string) => void
}

const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    })
}

const EventCard = memo(({ event, onDeleteEvent }: EventCardProps) => {
    const navigate = useNavigate();
    
    const handleView = useCallback(() => navigate(`/events/${event.id}/detail`), [event.id, navigate]);
    const handleEdit = useCallback(() => navigate(`/events/${event.id}/edit`), [event.id, navigate]);
    const handleJoin = useCallback(() => navigate(`/events/${event.id}/register`), [event.id, navigate]);
    const handleDelete = useCallback(() => onDeleteEvent(event.id), [event.id, onDeleteEvent]);
    return (
        <Box
            borderRadius="xl"
            overflow="hidden"
            boxShadow="lg"
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            _hover={{
                transform: 'translateY(-4px)',
                boxShadow: 'xl',
                bg: "gray"
            }}
            border="1px"
            h="380px"
            display="flex"
            flexDirection="column"
            position="relative"
            cursor={"pointer"}
            onClick={handleView}
            _
        >
            <Card
                p={4}
                overflow="hidden"
                flex={1}
                display="flex"
                flexDirection="column"

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
                <CardBody p={6} flex={1} display="flex" flexDirection="column">
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

                    <Divider mt={4} mb={0} />

                    <HStack spacing={2} w="full" position={"absolute"} bottom={5} left={5}>
                        <Button
                            size="sm"
                            bg={EventDesignSystem.primaryColor}
                            color="white"
                            _hover={{ opacity: 0.9 }}
                            onClick={handleView}
                        >
                            View
                        </Button>
                        <PermissionGuard allowedRoles={["admin"]}>
                            <Button
                                size="sm"
                                bg={EventDesignSystem.primaryColor}
                                color="white"
                                _hover={{ opacity: 0.9 }}
                                onClick={handleEdit}
                            >
                                Edit
                            </Button>
                            <Button
                                size="sm"
                                bg="red.500"
                                color="white"
                                type="button"
                                _hover={{ bg: "red.600" }}
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        </PermissionGuard>
                        <Button
                            size="sm"
                            bg={EventDesignSystem.primaryColor}
                            color="white"
                            _hover={{ opacity: 0.9 }}
                            onClick={handleJoin}
                        >
                            Join
                        </Button>
                    </HStack>
                </CardBody>
            </Card>


        </Box >
    )
});

export default EventCard;