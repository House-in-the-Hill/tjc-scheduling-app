import React, { useRef } from 'react';
import { FlatList } from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import { Calendar } from './Calendar';
import { useDispatch, useSelector } from 'react-redux';
import { extendCalendar } from '../../store/actions/calendarActions';
import { CarousalDirection } from '../../services/Calendar/models';
import { Layout } from '@ui-kitten/components';
import { calendarCardDimensions } from '../../shared/constants/';
import { TaskData } from '../../shared/models';
import { calendarRange } from '../../shared/constants/';
import { months } from '../../services/Calendar/models';
import { useStringDate } from '../../services/Hooks/useStringDate';
import { selectDate, showPreviewPane } from '../../store/actions';

//prevents rerendering on show TaskPreviewPane
export const Carousel = React.memo(
    () => {
        //useSelectors
        const data: Date[] = useSelector(
            ({ calendarReducer }) => calendarReducer.dateArray,
        );
        const tasks: TaskData[] = useSelector((state) => state.taskReducer.tasks);

        const dispatch = useDispatch();
        const carouselRef = useRef(null);

        //extends date array
        const isRefreshing: boolean = useSelector(
            ({ calendarReducer }) => calendarReducer.isRefreshing,
        );
        const loadMoreOnBottom = () => dispatch(extendCalendar(CarousalDirection.DOWN));
        const loadMoreOnTop = () => dispatch(extendCalendar(CarousalDirection.UP));

        //distributes tasks to appropriate calendar month
        const filterTasks = (dateItem) =>
            tasks.filter((task) => {
                //https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
                // const taskDate = new Date(task.date.replace(/-/g, '/')); //replacing '-' with '/' returns the correct date consistently
                const taskDate = new Date(task.date);
                return (
                    taskDate.getMonth() === dateItem.getMonth() &&
                    taskDate.getFullYear() === dateItem.getFullYear()
                );
            });

        const tilePressHandler = (date, dateTasks, cardIndex) => {
            dispatch(selectDate(date, dateTasks));
            dispatch(showPreviewPane());
            carouselRef.current.scrollToIndex({ index: cardIndex, animated: true });
        };

        const renderMonths = ({ item, index }) => {
            // const [isLeap, year, month] = useStringDate(item);

            return (
                <Card
                    header={() => (
                        <Text
                            style={{
                                paddingLeft: 20,
                            }}
                            category="h1"
                        >
                            {item.toLocaleDateString('en-US', {
                                month: 'long',
                                year: 'numeric',
                            })}
                        </Text>
                    )}
                    appearance="filled"
                    activeOpacity={1}
                    style={{
                        width: '100%',
                        height: calendarCardDimensions.height,
                        marginBottom: calendarCardDimensions.margin,
                    }}
                >
                    <Calendar
                        displayedDate={item}
                        tasks={filterTasks(item)}
                        handleTilePress={tilePressHandler}
                        type="calendarReducer"
                        cardIndex={index}
                    />
                </Card>
            );
        };

        return (
            <Layout>
                <FlatList
                    ref={carouselRef}
                    data={data}
                    keyExtractor={(item, index) => `${item.toString()}-${index}`}
                    renderItem={renderMonths}
                    onRefresh={loadMoreOnTop}
                    refreshing={isRefreshing}
                    onEndReachedThreshold={0.1}
                    onEndReached={loadMoreOnBottom}
                    initialScrollIndex={calendarRange}
                    initialNumToRender={calendarRange}
                    snapToAlignment={'start'}
                    decelerationRate={'normal'}
                    windowSize={12}
                    getItemLayout={(data, index) => {
                        return {
                            length: calendarCardDimensions.totalHeight,
                            offset: calendarCardDimensions.totalHeight * index,
                            index,
                        };
                    }}
                />
            </Layout>
        );
    },
    () => true, //prevents rerender of carousel on isPreviewPaneShowing state changes
);
