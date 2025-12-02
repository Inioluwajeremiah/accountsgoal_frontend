import { createContext, useContext, useEffect, useState } from 'react'

const stateContext = createContext({})

export const StateContextProvider = ({ children }) => {

    const [formData, setFormData] = useState({})
    // const fetchData = async () => {
    //     try {
    //         if (userToken) {
    //             setLoading(true)
    //             const res = await axios.get('https://spms.telexcoresources.com.ng/api/v1/pillar/view/all', {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     Authorization: `Bearer ${userToken}`
    //                 }
    //             })
    //             setPillars(res.data.data)
    //             setLoading(false)
    //         }
    //     } catch (error) {
    //         setLoading(true)

    //         console.log(error)
    //     }
    // }
    // useEffect(() => {
    //     fetchData()
    // }, [userToken])

 

    return (
        <stateContext.Provider
            value={{
                formData, setFormData
            }}
        >
            {children}
        </stateContext.Provider>
    )
}
export const useStateContext = () => useContext(stateContext)