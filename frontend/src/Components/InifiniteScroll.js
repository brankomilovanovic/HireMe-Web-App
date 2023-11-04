import {useEffect, useRef, useState} from 'react';

const InfiniteScroll = ({children, fetchFunction, requestData, data, setData, setDataAfterFetch, resetData}) => {

    const [currentScroll, setCurrentScroll] = useState(0);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(2);
    const [lastPage, setLastPage] = useState(false);

    useEffect(() => {
        handleResetData();
    }, [resetData]);

    useEffect(() => {
        const element = scrollRef?.current;
        const currentPosition = element?.scrollTop;
        const maxScrollPosition = element?.scrollHeight - element?.clientHeight;
        const scrollPercentage = (currentPosition / maxScrollPosition) * 100;

        if(!lastPage) {
            if (scrollPercentage > 80 && !loading) {
                setLoading(true);
                fetchData({...requestData, page: currentPage});
                setCurrentPage(currentPage + 1);
            }
        }
    }, [currentScroll]);

    const handleResetData = () => {
        scrollRef?.current?.scrollTo(0, 0);
        setCurrentScroll(0);
        setLoading(false);
        setCurrentPage(2);
        setLastPage(false);
    }

    const fetchData = (dataRequest) => {
        fetchFunction(dataRequest).then(response => {
            if(setDataAfterFetch(response)?.length === 0) {
                setLastPage(true);
                setLoading(false);
                return;
            }
            setData([...data, ...setDataAfterFetch(response)]);
            setLoading(false);
        })
    }

    const handleScroll = () => {
        setCurrentScroll(scrollRef?.current?.scrollTop);
    }

    return (
        <div ref={scrollRef} onScroll={handleScroll} style={{ overflowY: 'scroll' }}>
            {children}
        </div>
    );

}

export default InfiniteScroll;