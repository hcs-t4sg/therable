import { Avatar, Box, Button, Card, Flex, Text } from "@radix-ui/themes";

interface PatientCardProps {
  userId: string;
  firstName: string;
  lastName: string;
  diagnosis?: string;
  lastVisit?: Date;
  nextVisit?: Date;
  avatar?: string;
}

export default function PatientCard(props: PatientCardProps) {
  return (
    <Card className="h-[260px] w-[252px] rounded-xl shadow">
      <Flex direction="column" justify="between" gap="2">
        <Flex pl="1" pt="2" gap="3" align="start">
          <div className="pt-2">
            <Avatar
              radius="full"
              size="5"
              src={props.avatar}
              fallback={props.firstName.charAt(0) + props.lastName.charAt(0)}
              className="border-2"
            />
          </div>
          <div className="space-y-1">
            <Text className="pb-0.25" as="div" size="4" weight="medium">
              {props.firstName} {props.lastName}
            </Text>
            {props.diagnosis && (
              <Text as="div" size="1">
                Diagnosis: {props.diagnosis}
              </Text>
            )}
            {props.lastVisit && (
              <Text as="div" size="1">
                Last visit:{" "}
                {props.lastVisit.getMonth() + "/" + props.lastVisit.getDay() + "/" + props.lastVisit.getFullYear()}
              </Text>
            )}
            {props.nextVisit && (
              <Text as="div" size="1">
                Next visit:{" "}
                {props.nextVisit.getMonth() + "/" + props.nextVisit.getDay() + "/" + props.nextVisit.getFullYear()}
              </Text>
            )}
          </div>
        </Flex>
        <Flex gap="6" justify="center" pb="1">
          <Button className="h-fit" variant="soft" color="green" radius="large">
            <Flex direction="column" pb="2" pt="2">
              <Box height="7" />
              <Text size="1">Progress</Text>
            </Flex>
          </Button>
          <Button className="h-fit" variant="soft" color="gray" radius="large">
            <Flex direction="column" pb="2" pt="2">
              <Box height="7" />
              <Text size="1">Message</Text>
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
