import React, { useState } from "react";
// import { storiesOf } from "@storybook/react";

import { Grommet, Box, InfiniteScroll, Text } from "grommet";
import { grommet } from "grommet/themes";

// import { allItems } from "./Basics";



const LazyInfiniteScroll = (props) => {
    const allItems = props.allItems;
    const [items, setItems] = useState(props.allItems);
    const onMore = () => {
        setItems(allItems.slice(0, items.length + 30));
    };

    return (
        <Grommet theme={grommet}>
            <Box>
                <InfiniteScroll items={items} onMore={onMore}>
                    {item => (
                        <Box
                            key={item}
                            pad="medium"
                            border={{ side: "bottom" }}
                            align="center"
                        >
                            <Text>{item}</Text>
                        </Box>
                    )}
                </InfiniteScroll>
            </Box>
        </Grommet>
    );
};

export default LazyInfiniteScroll;

// storiesOf("InfiniteScroll", module).add("onMore", () => <LazyInfiniteScroll />);