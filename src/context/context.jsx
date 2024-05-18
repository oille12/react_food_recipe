import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

// 리덕스 대신 전역적으로 사용할 state (index.js 에서 App 컴포넌트를 감싸줘야 함)
export default function GlobalState({children}) {

    // 검색값 state
    let [searchParam, setSearchParam] = useState("");
    // 음식리스트 state
    let [foodList, setFoodList]= useState([]);
    // 음식 상세데이터 state
    let [foodDetailData, setFoodDetailData] = useState(null);
    // 즐겨찾기 등록 리스트 state
    let [favoritesList, setFavoritesList] = useState([]);

    // 제공할 함수
    // 검색하면 검색명으로 get요청
    async function hSubmit(event) {
        event.preventDefault(); // 부모까지 이벤트 버블링되는 것을 막는다.(입력없이 엔터시 주소바뀌는거 방지)
        
        // https:forkify-api.herokuapp.com/v2
        // https://forkify-api.herokuapp.com/api/v2/recipes?search=${재료명}
        
        try {
            // get요청 (REST API의 GET요청)
            const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`) 
            const information = await res.json();  // REST API는 JSON문자열로 전달하므로 사용할 수 있는 자료형으로 변경
            
            console.log(information);
            if(information?.data.recipes){
                setFoodList(information?.data.recipes);
                setSearchParam('');
            }
        } catch (e) {
            console.log(e)
        }
    }

    // favoritesList 즐겨찾기 등록 리스트 state의 배열을 수정(추가/삭제)
    // state의 배열은 직접 수정X -> ...으로 분리하고 []로 감싸서 카피본으로 수정 [...]

    // 변수를 안쓰고 useState를 하용하는 이유는 데이터값이 바뀌면 화면도 같이 갱신해주려고.
    function hAddToFavorite(getCurItem) {
        let copyFavoritesList = [...favoritesList]; // 배열 형태로 분해했다가 다시 배열로 만들어서 대입(카피본)

        // getCurItem의 id와 favoritesList의 id들을 비교 -> 동일한게 있는지 확인 검사
        const index = copyFavoritesList.findIndex(e=>e.id === getCurItem.id); // 못찾으면 -1, 찾으면 해당위치 return

        if(index === -1) {
            copyFavoritesList.push(getCurItem); // 즐겨찾기 리스트에 없으면 추가
        } else {
            copyFavoritesList.splice(index); // 있었으면 제거
        }

        // 새로만든 배열을 state에 덮어씀 (한개 값만 수정하면 화면이 안바뀌므로 배열째로 덮어씀)
        setFavoritesList(copyFavoritesList);
    }

    return(
        <GlobalContext.Provider value={
            {searchParam, setSearchParam, hSubmit, foodList, setFoodList, foodDetailData, setFoodDetailData, favoritesList, hAddToFavorite}}>
            {children}
        </GlobalContext.Provider>
    )
}