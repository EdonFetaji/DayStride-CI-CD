import {SimpleGrid} from '@mantine/core';
import GoalCard from './GoalCard.jsx';

const GoalGrid = ({goals, onEdit, onDelete, onLeaveClick}) => {
    return (
        <SimpleGrid cols={3} spacing="md">
            {goals.map((goal) => (
                <GoalCard
                    key={goal.id}
                    goal={goal}
                    onEditClick={onEdit}
                    onDeleteClick={onDelete}
                    onLeaveClick={onLeaveClick}
                />
            ))}
        </SimpleGrid>
    );
};

export default GoalGrid;
