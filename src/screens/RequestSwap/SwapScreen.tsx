import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, FlatList } from 'react-native';
import { Layout, Text, Select, IndexPath, Icon, Button } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { isSameDate } from '../../services/Calendar/helper_functions';
import { DatePicker } from '../../components/New Calendar/DatePicker';
import { populateCandidates, populateTimes } from './swapHelper';
import { CustomButton, buttonTypes } from '../../components/CustomButton';
import {
    coloredBackgroundGradient1,
    coloredBackgroundGradient2,
    nameCardShadowColorHighlighted,
    nameCardShadowColorNeutral,
    optionCardBorderColor,
} from '../../ui/colors';
import { LinearGradient } from 'expo-linear-gradient';
import User1 from '../../assets/Svgs/User1.svg';
import User4 from '../../assets/Svgs/User4.svg';

const dummyCandidates = [
    {
        firstName: 'Ted',
        lastName: 'Chen',
        id: 5,
        tasks: [
            {
                church: {
                    churchId: 3,
                    name: 'Elizabeth',
                },
                createdAt: '2020-10-04T01:07:23.900Z',
                date: '2020-08-21T14:30:00.000Z',
                role: {
                    name: 'RE',
                },
                roleId: 4,
                taskId: 5,
                user: {
                    firstName: 'Shaun',
                    lastName: 'Tung',
                },
                userId: 1,
            },
            {
                church: {
                    churchId: 1,
                    name: 'Hillsborough',
                },
                createdAt: '2020-10-04T01:07:23.900Z',
                date: '2020-08-21T14:30:00.000Z',
                role: {
                    name: 'AV',
                },
                roleId: 1,
                taskId: 2,
                user: {
                    firstName: 'Shaun',
                    lastName: 'Tung',
                },
                userId: 1,
            },
        ],
    },
    {
        firstName: 'Mike',
        lastName: 'Chen',
        id: 5,
        tasks: [
            {
                church: {
                    churchId: 3,
                    name: 'Elizabeth',
                },
                createdAt: '2020-10-04T01:07:23.900Z',
                date: '2020-08-21T14:30:00.000Z',
                role: {
                    name: 'RE',
                },
                roleId: 4,
                taskId: 5,
                user: {
                    firstName: 'Shaun',
                    lastName: 'Tung',
                },
                userId: 1,
            },
            {
                church: {
                    churchId: 1,
                    name: 'Hillsborough',
                },
                createdAt: '2020-10-04T01:07:23.900Z',
                date: '2020-08-21T14:30:00.000Z',
                role: {
                    name: 'AV',
                },
                roleId: 1,
                taskId: 2,
                user: {
                    firstName: 'Shaun',
                    lastName: 'Tung',
                },
                userId: 1,
            },
        ],
    },
];

export const SwapScreen = (props) => {
    // TODO: sort candidates alphabetically before here, maybe server side?
    // Display message "nothing meets search criteria"
    // const swapCandidates = useSelector((state) => state.swapReducer.candidates || []);
    const swapCandidates = dummyCandidates;
    const [selectedPeopleIndices, setSelectedPeopleIndices] = useState<IndexPath[]>([]);
    const [selectedTimeIndices, setSelectedTimeIndices] = useState<IndexPath[]>([]);
    const [selectedDates, setSelectedDates] = useState([]);

    //https://stackoverflow.com/questions/48834275/good-way-to-chain-filter-functions-in-javascript/48834470#48834470
    const filters = [
        (task) =>
            selectedPeopleIndices.length === 0
                ? true
                : selectedPeopleIndices.some(
                      (item) =>
                          swapCandidates[item.row].firstName === task.user.firstName &&
                          swapCandidates[item.row].lastName === task.user.lastName,
                  ),
        (task) =>
            selectedDates.length > 0
                ? selectedDates.some((date) =>
                      isSameDate(new Date(date), new Date(task.date)),
                  )
                : true,
        (task) => !task.isSelected,
    ];

    //these operations only need to be run once on render. useEffect runs after everything is loaded so things that relied on tasks got angry at me
    const tasks = React.useMemo(
        () =>
            swapCandidates
                .reduce((acc, currentValue) => [...acc, ...currentValue.tasks], [])
                .map((task) => ({ ...task, isSelected: false }))
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()), //may not need if swapCandidates are pre-sorted
        [swapCandidates],
    );

    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const selectedTasks = filteredTasks.filter((task) => task.isSelected);

    //callbacks
    const onItemSelect = (item, index) => {
        setFilteredTasks((f) => {
            let tempFilteredTasks = [...f];
            tempFilteredTasks[index].isSelected = !tempFilteredTasks[index].isSelected;
            return tempFilteredTasks;
        });
    };
    const onTilePress = (date) => {
        const dates = selectedDates.filter((item) => !isSameDate(item, date));
        dates.length === selectedDates.length
            ? setSelectedDates([...selectedDates, date])
            : setSelectedDates(dates);
    };

    //dropdown items for people select
    const candidates = populateCandidates(swapCandidates);
    const displayedPerson =
        selectedPeopleIndices.length === 0
            ? 'Name'
            : selectedPeopleIndices.length === 1
            ? `${swapCandidates[selectedPeopleIndices[0].row].firstName} ${
                  swapCandidates[selectedPeopleIndices[0].row].lastName
              }`
            : `${swapCandidates[selectedPeopleIndices[0].row].firstName} ${
                  swapCandidates[selectedPeopleIndices[0].row].lastName
              }...`;

    //dropdown items for time select
    //TODO: hook up to actual task times
    const possibleTimes = ['AM', 'PM']; //temp until database is finished
    const times = populateTimes(possibleTimes);
    const displayedTime =
        selectedTimeIndices.length === 0
            ? 'Time'
            : selectedTimeIndices.length === 1
            ? possibleTimes[selectedTimeIndices[0].row]
            : `${possibleTimes[selectedTimeIndices[0].row]}...`;
    //is there a better way to indicate that multiple times/people are selected besides "..." ? not too big a fan of how it looks

    const iconProps = {
        height: 30,
        width: 30,
        fill: '#000000',
    };

    //flatlist render
    const renderTaskList = ({ item, index }) => {
        const taskStyle = item.isSelected
            ? { ...styles.listItem, ...styles.selectedItem }
            : styles.listItem;
        return (
            <TouchableOpacity
                style={taskStyle}
                onPress={() => onItemSelect(item, index)}
                activeOpacity={1}
            >
                <Icon name="person-outline" {...iconProps} />
                <Text category="h3">
                    {item.user.firstName} {item.user.lastName}
                </Text>
                <View style={{ flexDirection: 'column' }}>
                    <Text category="h3">{item.role.name}</Text>
                    <Text category="h3">
                        {new Date(item.date).toLocaleDateString('en-US')}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const filterTasks = () => {
        const filtered = filters.reduce(
            (accumulator, filterFunc) => accumulator.filter(filterFunc),
            tasks,
        );
        const selected = tasks.filter((task) => task.isSelected);
        return [...selected, ...filtered];
    };

    const onBlurHandler = () => {
        setFilteredTasks(() => filterTasks());
    };

    const onNextHandler = () => {
        props.navigation.navigate('SwapSummary', {
            selectedTasks: selectedTasks,
        });
    };

    return (
        <Layout style={styles.layout}>
            <View style={styles.textContainer}>
                <Text category="h3">Select one or more workers to request</Text>
                <Text category="h3">an exchange of duty times</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        width: '35%',
                        marginTop: 5,
                    }}
                >
                    <User1 {...iconProps} />
                    <Icon name="swap" {...iconProps} />
                    <User4 {...iconProps} />
                </View>
            </View>
            <View style={styles.filterContainer}>
                <DatePicker
                    selectedDates={selectedDates}
                    onTilePress={onTilePress}
                    initialTasks={tasks}
                    onBlur={onBlurHandler}
                />

                <Select
                    selectedIndex={selectedPeopleIndices}
                    placeholder="Person"
                    value={displayedPerson}
                    onSelect={(index: IndexPath[]) => {
                        setSelectedPeopleIndices(index);
                    }}
                    onBlur={onBlurHandler}
                    multiSelect={true}
                    style={{ width: '40%', padding: 2 }}
                >
                    {candidates}
                </Select>

                <Select
                    selectedIndex={selectedTimeIndices}
                    placeholder="Time"
                    value={displayedTime}
                    onSelect={(index: IndexPath[]) => {
                        setSelectedTimeIndices(index);
                    }}
                    style={{ width: '28%' }}
                    multiSelect={true}
                >
                    {times}
                </Select>
            </View>

            <LinearGradient
                colors={[coloredBackgroundGradient1, coloredBackgroundGradient2]}
                style={styles.listContainer}
            >
                <FlatList
                    data={filteredTasks}
                    renderItem={renderTaskList}
                    keyExtractor={(item) => `${item.date} ${item.id} ${item.taskId}`}
                    showsVerticalScrollIndicator={false}
                />

                <CustomButton
                    text="Next"
                    styling={{ height: 42, width: 180 }}
                    onPress={onNextHandler}
                    type={
                        // selectedTasks.length > 0
                        buttonTypes.CONFIRM
                        // : buttonTypes.DISABLED
                    }
                />
            </LinearGradient>
        </Layout>
    );
};
const styles = StyleSheet.create({
    layout: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    filterContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },
    listContainer: {
        flex: 6,
        width: '100%',
        zIndex: -1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20, //TODO figure out why these dont work
        borderTopRightRadius: 20,
        padding: 30,
    },
    textContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    listItem: {
        width: 330,
        height: 70,
        margin: 5,
        padding: 5,
        borderRadius: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',

        shadowColor: nameCardShadowColorNeutral,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4 / 2,

        elevation: 3,
    },
    selectedItem: {
        borderColor: optionCardBorderColor,
        borderWidth: 2,
        backgroundColor: 'white',
        margin: 5,
        padding: 4,
        shadowColor: nameCardShadowColorHighlighted,
        shadowRadius: 10 / 2,
    },
});
