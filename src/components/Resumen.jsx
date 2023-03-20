import React from 'react'
import {primerMayuscula} from '../helpers/primeraLetraMayuscula';
import styled from '@emotion/styled';

const ContenedorResumen = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00838F;
    color: #FFF;
    margin-top: 1rem;
`;

export const Resumen = ({ datos }) => {
    const { marca, year, plan } = datos;
    if (marca === '' || year === '' || plan === '') {
        return null;
    }
    return (
        <ContenedorResumen>
            <h2>Resumen de Cotizacion</h2>
            <ul>
                <li>Marca: {primerMayuscula(marca)} </li>
                <li>Año del auto: {primerMayuscula(year)} </li>
                <li>Plan: {primerMayuscula(plan)} </li>
            </ul>
        </ContenedorResumen>
    )
}