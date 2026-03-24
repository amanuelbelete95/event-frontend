import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";
import { Badge, Box, Button, Card, CardBody, Divider, Heading, HStack, Icon, Stack, Text, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { memo, useCallback } from "react";
import { FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/dateUtility";
import BasicEventModalRegModal from "../../BasicEventModalReg";
import { PermissionGuard } from "../../PermissionGuard";
import { registerToEvent } from "../../register-events/api/registerToEvent";
import { EventDesignSystem } from "../designSystem";
import { EventAPIResponse } from "../events.type";
import userEvent from "@testing-library/user-event";
import { useAuth } from "../../auth/AuthProvider";

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
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();
    const handleView = useCallback(() => navigate(`/events/${event.id}/detail`), [event.id, navigate]);
    const handleEdit = useCallback((e: React.MouseEvent) => { e.stopPropagation(); navigate(`/events/${event.id}/edit`) }, [event.id, navigate]);
    const handleDelete = useCallback((e: React.MouseEvent) => { e.stopPropagation(); onDeleteEvent(event.id) }, [event.id, onDeleteEvent]);
    const { mutate: registerEventFn } = useMutation({
        mutationFn: registerToEvent,
        onSuccess: () => {
            toast({
                title: "Event joined",
                description: "Event joined successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
            })
            navigate("/events")

        },
        onError: (error) => {
            toast({
                title: "Event Join failed",
                description: `${error.message}`,
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }
    });
    return (
        <>
            <BasicEventModalRegModal
                isOpen={isOpen}
                onConfirm={registerEventFn}
                event={event} onClose={onClose}
            />
            <Box
                borderRadius="xl"
                overflow="hidden"
                boxShadow="lg"
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: 'xl',
                    // bg: "gray.50"
                }}
                h="380px"
                display="flex"
                flexDirection="column"
                position="relative"
                cursor={"pointer"}
                onClick={handleView}
                p={4}
                w={"500px"}
            >
                <Card
                    overflow="hidden"
                    flex={1}
                    display="flex"
                    flexDirection="column"
                    p={2}>
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

                        <HStack spacing={2} w="full" position={"absolute"} bottom={2} left={1} >
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
                                onClick={handleView}
                            >
                                View
                            </Button>
                            <>
                                <Button
                                    size="sm"
                                    bg={EventDesignSystem.primaryColor}
                                    color="white"
                                    disabled={user?.role === "admin" ? false : event.registration_status}
                                    onClick={(e) => { e.stopPropagation(); onOpen(); }}
                                >
                                    {user?.role === "admin" ? "Manage Registration" : "Register"}
                                </Button>
                            </>

                        </HStack>
                    </CardBody>
                </Card>


            </Box >
        </>
    )
});

export default EventCard;