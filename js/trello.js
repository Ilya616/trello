export class Trello{
    static containerTrello = document.querySelector(".wrap");
    cards;

    constructor(el){
        this.query("select_start_content", null, this.renderInit);
    }

    renderInit(data_json){
        let dataContent = JSON.parse(data_json);

        let content = "";
        dataContent.status.forEach((v, i)=>{

            let contentWork = "";
            dataContent.works.forEach((value, index)=>{
                if(value.id_status == v.id){
                    contentWork += `<div class="work" data-id="${value.id}">${value.title}</div>`
                }
            })

            content += `<div class="col status_${v.id}" data-status="${v.id}">
                            <h3>${v.name}</h3>
                            <div class="works_wrap">
                                ${contentWork}
                            </div>
                        </div> `;
        })

        Trello.containerTrello.innerHTML = content;

        
        this.onChengeCol();
    }

    onChengeCol(){
        this.cards = document.querySelectorAll(".work");

        this.cards.forEach((el)=>{
            el.addEventListener('click', (evt)=>{
                
                let colElement = evt.target.parentElement.parentElement;
        
                let colElementNext = document.querySelector(`.status_${Number(colElement.getAttribute("data-status"))+1}`);
        
                if(colElementNext!= null){
                    colElementNext.querySelector(".works_wrap").prepend(evt.target);
        
                    let data = {
                        "id": evt.target.getAttribute("data-id"),
                        "id_col_next": Number(colElement.getAttribute("data-status"))+1
                    }
                    this.query("move_cards", data);
        
                }
            })
        })
    }

    query(file, data = null, f){
        $.post(
            "framework/ajax/"+file+".php",
            data,
            (data) => {
                f.bind(this, data)();
            }
          );
           
          
    }
}