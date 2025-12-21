import { poiData } from '../data/poiData';

/**
 * Maps quiz scores to the 4 core dimensions defined in Travel_Soul_Spectrum_to_POI_Mapping.md
 * Each dimension is a value between 0 and 1.
 */
export const calculateDimensions = (scores) => {
    if (!scores) return {
        meaning_orientation: 0.5,
        inner_orientation: 0.5,
        exploration_preference: 0.5,
        structure_preference: 0.5
    };

    const getRatio = (sideA, sideB) => {
        const valA = scores[sideA] || 0;
        const valB = scores[sideB] || 0;
        const total = valA + valB;
        return total === 0 ? 0.5 : valA / total;
    };

    return {
        // 1 -> meaning-driven (soulSeeker), 0 -> pleasure-driven (pleasureSeeker)
        meaning_orientation: getRatio('soulSeeker', 'pleasureSeeker'),
        // 1 -> introspective (wanderer), 0 -> social (connector)
        inner_orientation: getRatio('wanderer', 'connector'),
        // 1 -> hidden gems (explorer), 0 -> iconic (comfortKeeper)
        exploration_preference: getRatio('explorer', 'comfortKeeper'),
        // 1 -> planned (architect), 0 -> flow (flowWalker)
        structure_preference: getRatio('architect', 'flowWalker')
    };
};

/**
 * Ranks all POIs based on the user's dimensions.
 */
export const getRankedPool = (scores) => {
    const dims = calculateDimensions(scores);

    return poiData.map(poi => {
        let matchScore = 0;

        // 1. Exploration Level Match (High Priority)
        const expPref = dims.exploration_preference;
        const poiExp = poi.exploration_level;
        if (expPref > 0.65) {
            if (poiExp === 'hidden_gem') matchScore += 10;
            else if (poiExp === 'semi-known') matchScore += 7;
            else matchScore += 2;
        } else if (expPref < 0.35) {
            if (poiExp === 'iconic') matchScore += 10;
            else if (poiExp === 'semi-known') matchScore += 5;
            else matchScore += 1;
        } else {
            if (poiExp === 'semi-known') matchScore += 10;
            else matchScore += 5;
        }

        // 2. Social Density Match
        const innerPref = dims.inner_orientation;
        const poiSocial = poi.social_density;
        if (innerPref > 0.65) {
            if (poiSocial === 'low-social') matchScore += 8;
            else if (poiSocial === 'mixed') matchScore += 4;
        } else if (innerPref < 0.35) {
            if (poiSocial === 'high-social') matchScore += 8;
            else if (poiSocial === 'mixed') matchScore += 4;
        } else {
            if (poiSocial === 'mixed') matchScore += 8;
            else matchScore += 4;
        }

        // 3. Structure Level Match
        const structPref = dims.structure_preference;
        const poiStruct = poi.structure_level;
        if (structPref > 0.65) {
            if (poiStruct === 'highly-structured') matchScore += 6;
            else if (poiStruct === 'semi-structured') matchScore += 3;
        } else if (structPref < 0.35) {
            if (poiStruct === 'free-flow') matchScore += 6;
            else if (poiStruct === 'semi-structured') matchScore += 3;
        } else {
            if (poiStruct === 'semi-structured') matchScore += 6;
            else matchScore += 3;
        }

        // 4. Content Type Match (Soft Preference)
        const meaningPref = dims.meaning_orientation;
        const poiContent = poi.content_type;
        if (meaningPref > 0.65) {
            if (['history_culture', 'art_design', 'nature'].includes(poiContent)) matchScore += 4;
        } else if (meaningPref < 0.35) {
            if (['night_scene', 'food_focus', 'market'].includes(poiContent)) matchScore += 4;
        } else {
            if (['urban_walk', 'neighborhood'].includes(poiContent)) matchScore += 4;
        }

        return { ...poi, id: poi['﻿poi_id'], matchScore };
    }).sort((a, b) => b.matchScore - a.matchScore);
};

export const getRecommendations = (scores, limit = 10) => {
    return getRankedPool(scores).slice(0, limit);
};
