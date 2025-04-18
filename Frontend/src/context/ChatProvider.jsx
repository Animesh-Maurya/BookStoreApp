import { createContext, useContext,useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({children}) => {
    const [selectedGroup, setSelectedGroup] = useState();
    const [group,setGroup] = useState([]);

    return <ChatContext.Provider value={{selectedGroup,setSelectedGroup,group,setGroup

    }}>
        {children}

    </ChatContext.Provider>
};

export const ChatState= ()=>{
    return useContext(ChatContext);
}

export default ChatProvider ;