import React, { useState } from 'react';
import styled from '@emotion/styled';
import { obtenerDiferenciaYEar } from '../helpers/diferenciaYear';
import { calcularMarca } from '../helpers/calcularMarca';
import { obtenerPlan } from '../helpers/calculaTipoSeguro';
const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;
const Label = styled.label`
    flex: 0 0 100px;
`;
const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #E1E1E1;
    -webkit-appearance: none;
`;
const InputRadio = styled.input`
    margin: 0 1rem;
`;
const Boton = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;
    &:hover {
        background-color: #26C6DA;
        cursor: pointer;
   }
`;
const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
`;

export const Formulario = ({ guardarResumen, setCargando }) => {

    const [datos, guardarDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    });

    const [error, guardarError] = useState(false);


    //extraer los valores del state
    const { marca, year, plan } = datos;

    //Leer los datos del formulario y colocarlos en el state
    const obtenerInformacion = (event) => {
        guardarDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const cotizarSeguro = event => {
        event.preventDefault();
        if (marca.trim() === '' || year.trim() === '' || plan.trim() === '') {
            guardarError(true);
            return;
        } else {
            guardarError(false);


            //base de 2000$ del seguro
            let resultado = 2000;

            //obtener la diferencia de anios
            const diferencia = obtenerDiferenciaYEar(year);

            //por cada year hay que multiplar por  3% de la base
            resultado = resultado - ((diferencia * 0.03) * 2000);


            //Americano 15%
            //Asiatico 5%
            //Europeo 30%
            resultado = calcularMarca(marca) * resultado;

            //Basico aumenta 20%
            //Completo aumenta 50%
            const incrementoPlan = obtenerPlan(plan);
            resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

            //Total
            setCargando(true);
            setTimeout(() => {
                setCargando(false);
                guardarResumen({
                    cotizacion: resultado,
                    datos
                });
            }, 3000);
        }



    }
    return (
        <form onSubmit={cotizarSeguro}>
            {error ? <Error>Todos los campos son obligatorios</Error> : null}
            <Campo>
                <Label>Marca</Label>
                <Select name="marca" value={marca} onChange={obtenerInformacion}>
                    <option value="">--Seleccione--</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Año</Label>
                <Select name="year" value={year} onChange={obtenerInformacion}>
                    <option value="">-- Seleccione --</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Plan</Label>
                <InputRadio type="radio" name="plan" value="basico" checked={plan === "basico"} onChange={obtenerInformacion} />Básico
                <InputRadio type="radio" name="plan" value="completo" checked={plan === "completo"} onChange={obtenerInformacion} />Completo
            </Campo>

            <Boton type='submit'>Cotizar</Boton>
        </form>
    )
}
