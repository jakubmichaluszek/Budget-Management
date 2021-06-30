//Container variable in which user can put personalized categories
const categoriesContainer = document.querySelector(".form-categories");
const addCategoryButton = document.querySelector(".add-category-button");
const dataTookFromUserContainer = document.querySelector(".data-took-from-user");

let allCategoriesArray = categoriesContainer.getElementsByTagName('input');

const resetButton = document.querySelector(".resetButton");
const submitButton = document.querySelector(".submitButton");

let cattegoriesChosenArray = [];
let existingCattegories=[];
let usersName;
let usersBudget;

//filling up the existing categories values in lower case.
fillExistingCattegoriesArray();

//function that add input and label of category
addCategoryButton.addEventListener('click', ()=>{
    let newCategoryValue = document.querySelector(".add-category").value.trim();
    if((newCategoryValue!="") && (!/\s/.test(newCategoryValue)) && (!existingCattegories.includes(newCategoryValue.toLowerCase()))){

        console.log(newCategoryValue);
        //pushing added category 
        existingCattegories.push(newCategoryValue.toLowerCase().trim());
        //creating new category input 
            let newCategoryInput = document.createElement("input");
            newCategoryInput.type = "checkbox";
            newCategoryInput.name = "categories";
            newCategoryInput.value=newCategoryValue;
        //creating new category label
            let newCategoryLabel= document.createElement("label");
            newCategoryLabel.htmlFor=newCategoryValue;
            newCategoryLabel.append(newCategoryValue);
        //adding some class, that allows "reset" button remove those categories.
            newCategoryInput.classList.add("added");
            newCategoryLabel.classList.add("added");  
        categoriesContainer.append(newCategoryInput,newCategoryLabel);   
        console.log(existingCattegories);

    }
    else{
        console.log("musi zawierac nazwe");
    }
});



//This function removes added user's categories, by clicking in reset button.
resetButton.addEventListener('click', ()=>{
    document.querySelectorAll(".added").forEach(el => el.remove());
    document.querySelectorAll('.hidden').forEach(el => el.classList.toggle('hidden'));
    document.querySelector(".data-form").reset();
    //clearing array and console
    cattegoriesChosenArray = [];

    //reseting existing categories
    existingCattegories= [];
    fillExistingCattegoriesArray();
    dataTookFromUserContainer.classList.remove("data-took-from-user-active");
});


submitButton.addEventListener('click', ()=>{
//checking how many categories have been chosen.  

let checkedCategories = checkboxCheck (allCategoriesArray);
let checkedNameAndBudget= checkNameAndBudget();
//If user didn't choose any category, show some alert
console.log(checkedNameAndBudget);

if(checkedCategories && checkedNameAndBudget){
     appendDataFromUser();
    
}

});



//filling up the existing categories values in lower case.
function fillExistingCattegoriesArray(){
    for(let i = 0; i < allCategoriesArray.length; i++){
        existingCattegories.push(allCategoriesArray[i].value.toLowerCase());
    }
    console.log(existingCattegories);
    };



//this function checks if any category was chosen.
function checkboxCheck (allCategoriesArray){
    let checkboxCounter=0;
    for(let i = 0, arrayLength = allCategoriesArray.length; i< arrayLength; i++){
        if (allCategoriesArray[i].checked){
            checkboxCounter++;
            if(!cattegoriesChosenArray.includes(allCategoriesArray[i])){
                cattegoriesChosenArray.push(allCategoriesArray[i]);
            }
        }
    }
    if(checkboxCounter==0){
        return false;
    }  
console.log(cattegoriesChosenArray);      
return true;
}



function checkNameAndBudget(){
    usersName = document.querySelector(".usersName").value;
    usersBudget =document.querySelector(".usersBudget").value;
    if((usersName !="") && (isNaN(usersName)) && (usersBudget > 0)){
        return true;
    }
    return false;
}



function appendDataFromUser(){
    if (dataTookFromUserContainer.children.length == 0 ) {
        dataTookFromUserContainer.classList.add("data-took-from-user-active");
        createUsersDiv();
        createBudgetDiv();
        createCategoriesContainer();
        document.querySelector('.form-user').classList.add('hidden');
    }
}

//creating div that contains users name
function createUsersDiv(){
    let nameDiv = document.createElement("div");
    nameDiv.classList.add("added","userNameDiv");
    dataTookFromUserContainer.append(nameDiv);
    nameDiv.append(document.createTextNode("Imie: "+ usersName));
    
}

//creating div that contains users budget
function createBudgetDiv(){
    let budgetDiv =document.createElement("div");
    budgetDiv.classList.add("added","userBudgetDiv");
    dataTookFromUserContainer.append(budgetDiv);
    calculateBudget(budgetDiv,usersBudget);
}

function calculateBudget(budgetDiv,budgetValue){
    budgetDiv.innerHTML ="";
    budgetDiv.append(document.createTextNode("Budżet: "+budgetValue));
}

//create categories container 
function createCategoriesContainer(){
    let categoriesDiv= document.createElement("div");
    categoriesDiv.classList.add("added","categoriesDiv");
    dataTookFromUserContainer.append(categoriesDiv);
    categoriesDiv.append(document.createTextNode("Wybrane Kategorie: "));

    //fill categories container in categories that user has chosen.
    for(let i=0; i < cattegoriesChosenArray.length; i++){
        let createCategoriesDiv = document.createElement("div");
        createCategoriesDiv.classList.add( "added", "category_chart_container");
        createCategoriesDiv.append(cattegoriesChosenArray[i].value);
        categoriesDiv.append(createCategoriesDiv);
        createCategoriesCharts(i,createCategoriesDiv);
    }
    createCategoriesBudgetCounter();
}

//creates a chart inside each cattegory, with unique class name
function createCategoriesCharts(i,createCategoriesDiv){
    let categoriesChartDiv = document.createElement("div");
    categoriesChartDiv.classList.add(cattegoriesChosenArray[i].value.toLowerCase()+"-chart");
    createCategoriesDiv.append(categoriesChartDiv);
}



//This function creates div that contains : 
// select with options, input type number to get value that user wants to reduce
// input to calculate.
function createCategoriesBudgetCounter(){
    let budgetReducingDiv = document.createElement("div");
    budgetReducingDiv.classList.add("budgetReducingDiv", "added");
    dataTookFromUserContainer.append(budgetReducingDiv);
    
    let budgetReducingSelect = createBudgetSelect(budgetReducingDiv);
    let budgetReducingValue = createBudgetNumber(budgetReducingDiv);
    let budgetReducingInput = createBudgetInput(budgetReducingDiv);
    createHistoryContainer();
   

    budgetReducingInput.addEventListener("click", ()=>{
    let reduceValue = budgetReducingValue.value;
    let reduceInfo  = budgetReducingSelect.value;

    calculateFromBudget(reduceValue,reduceInfo);    
    });
}

//creating select with options that are categories, which user choose.
function createBudgetSelect(budgetReducingDiv){
    let budgetReducingSelect = document.createElement("select");
    for(let i = 0; i < cattegoriesChosenArray.length; i++){
        let budgetReducingOption = document.createElement("option");
        budgetReducingOption.value = cattegoriesChosenArray[i].value;
        budgetReducingOption.append(document.createTextNode(cattegoriesChosenArray[i].value));
        budgetReducingSelect.append(budgetReducingOption);
    }
    budgetReducingDiv.append(budgetReducingSelect); 
    return budgetReducingSelect;
}



//creating input to calculate. 
function createBudgetInput(budgetReducingDiv){
let budgetReducingInput= document.createElement("input");
budgetReducingInput.type = "button";
budgetReducingInput.value = "Przelicz";
budgetReducingDiv.append(budgetReducingInput);
return budgetReducingInput;
}


function createBudgetNumber(budgetReducingDiv){
    let budgetReducingNumber = document.createElement("input");
    budgetReducingNumber.type = "number";
    budgetReducingDiv.append(budgetReducingNumber);
    return budgetReducingNumber;
}


// <------------------------------------------------------------------------------>
function calculateFromBudget(reduceValue,reduceInfo){
usersBudget = Number(usersBudget)-Number(reduceValue);
if(usersBudget<=0){
    console.log("koniec budzetu, nie mozna odjąć");
    usersBudget = Number(usersBudget) + Number(reduceValue);
    console.log(usersBudget);
}
else{
    let budgetDiv = document.querySelector(".userBudgetDiv");
    calculateBudget(budgetDiv,usersBudget);
    addHistoryOfTransactions(reduceValue,reduceInfo);
    console.log(usersBudget);
}
}
//
function createHistoryContainer(){
 let historyContainer= document.createElement("div");
 historyContainer.classList.add("added", "historyContainer");
dataTookFromUserContainer.append(historyContainer);
}


/*this function adds element to history of transactions. containing:
- Budget before,
- Budget after,
- 
*/
function addHistoryOfTransactions(reduceValue,reduceInfo){

let historyRow = document.createElement("div");
historyRow.classList.add("historyRow");

let budgetBefore = document.createElement("div");
let parsedBudget= Number(usersBudget) + Number(reduceValue);
budgetBefore.append(document.createTextNode("Budżet przed: "+ parsedBudget));

let reduceAmount = document.createElement("div");
reduceAmount.append(document.createTextNode("Kwota:  "+reduceValue));

let reduceCategory = document.createElement("div");
reduceCategory.append(document.createTextNode("Kategoria: "+reduceInfo));

let budgetAfter=document.createElement("div");
budgetAfter.append(document.createTextNode("Budżet po: "+usersBudget));
historyRow.append(budgetBefore,reduceAmount,reduceCategory,budgetAfter);
document.querySelector(".historyContainer").append(historyRow);

}