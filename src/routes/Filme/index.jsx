import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-modal"

import api from "../../service/api"

import './filme.css'

Modal.setAppElement('#root');
function Filme() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [modalIsOpen, setIsOpen] = useState(false);
    const [item, setItem] = useState({});
    const [nome, setNome] = useState();
    const [ano, setAno] = useState();
    const [poster, setPoster] = useState();
    const [descricao, setDescricao] = useState();

    useEffect(() => {
        async function getApi() {
            await api.get(`/terror/${id}`)
            .then((response) => {
                setItem(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error)
                navigate("/", {replace: true})
                return
            })
        }

        getApi();
        
    }, [ id])

    const editElement = async (id) => {
        await api.patch(`/terror/${id}`, {
          nome: nome,
          poster: poster,
          ano: ano,
          descricao: descricao
        })
        .then((sucesso) => console.log(sucesso))
        window.location.reload();
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
      
    return ( 
        <div>
            <h1>Novo Filme</h1>
            
            <div>
                <div>
                    <p>{item.nome}</p>
                    <svg onClick={openModal} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </div>
                <p>{item.descricao}</p>
                <p>{item.ano}</p>
                <img width="100px" src={item.poster} alt="" />
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                overlayClassName="modal-overlay"
                className="modal-content"
              >
                <form className='box-modal'>
                  <label htmlFor="">Alterar nome:</label>
                    <input type="text" placeholder='Digite o nome do item' onChange={(e) => setNome(e.target.value)}/>

                  <label htmlFor="">Alterar descrição:</label>
                    <textarea type="text" placeholder='Digite a descrição do item' onChange={(e) => setDescricao(e.target.value)}/>

                  <label htmlFor="">Alterar preço:</label>
                    <input type="text" placeholder='Digite o preço do item' onChange={(e) => setAno(e.target.value)}/>

                  <label htmlFor="">Alterar poster:</label>
                    <input type="text" name='image' placeholder='Digite a url do poster' onChange={(e) => setPoster(e.target.value)}/>
                </form>
                
                <button className='btn-modal'
                onClick={() => editElement(item.id)}
                >Salvar alterações</button>
                <button className='btn-modal' onClick={closeModal}>Close</button>
              </Modal> 
        </div>
     );
}

export default Filme;