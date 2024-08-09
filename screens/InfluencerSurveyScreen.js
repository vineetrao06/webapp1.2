import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import 'survey-core/defaultV2.min.css';
import { useTheme } from 'react-native-paper';
// import { LayeredDarkPanelless, SolidDarkPanelless, ThreeDimensionalDarkPanelless } from "survey-core/themes";



const surveyJSON = {
    pages: [
        {
            name: "genresPage",
            elements: [
                {
                    isRequired: "true",
                    type: "checkbox",
                    name: "genres",
                    title: "What are the preferred genres you are willing to promote? Choose as many as you like",
                    choices: ["Pop", "Rock", "Hip-Hop/Rap", "Jazz", "Classical", "Country", "Electronic/Dance", "R&B/Soul", "Reggae", "Blues"]
                }
            ]
        },
        {
            name: "industryPage",
            elements: [
                {
                    isRequired: "true",
                    type: "dropdown",
                    name: "industry",
                    title: "What industry do you make content in?",
                    choices: ["Fashion", "Beauty", "Fitness", "Food and Beverage", "Travel", "Lifestyle"]
                }
            ]
        },
        {
            name: "platformsPage",
            elements: [
                {
                    isRequired: "true",
                    type: "checkbox",
                    name: "platforms",
                    title: "What social media platforms are you on? Choose as many as you like",
                    choices: ["Facebook", "Instagram", "Tiktok", "Snapchat", "Youtube", "Twitter"]
                }
            ]
        },
        {
            name: "followersPage",
            elements: [
                {
                    isRequired: "true",
                    type: "text",
                    name: "followers",
                    title: "How many followers do you have on your most-followed platform?",
                    inputType: "number"
                }
            ]
        }
    ]
};

const InfluencerSurveyScreen = ({onLogin}) => {
    const navigate = useNavigate();
    const survey = new Model(surveyJSON);
    const { colors } = useTheme();

    // const genresQ = survey.getQuestion("genre")
    
    survey.applyTheme({
        "themeName": "default",
        "colorPalette": "dark",
        "isPanelless": true,
        "backgroundImage": "",
        "backgroundOpacity": 1,
        "backgroundImageAttachment": "scroll",
        "backgroundImageFit": "cover",
        "cssVariables": {
            "--sjs-corner-radius": "4px",
            "--sjs-base-unit": "8px",
            "--sjs-shadow-small": "0px 1px 2px 0px rgba(0, 0, 0, 0.35)",
            "--sjs-shadow-inner": "inset 0px 1px 2px 0px rgba(0, 0, 0, 0.2)",
            "--sjs-border-default": "rgba(255, 255, 255, 0.12)",
            "--sjs-border-light": "rgba(255, 255, 255, 0.08)",
            "--sjs-general-backcolor": "rgba(48, 48, 48, 1)",
            "--sjs-general-backcolor-dark": "rgba(52, 52, 52, 1)",
            "--sjs-general-backcolor-dim-light": "rgba(43, 43, 43, 1)",
            "--sjs-general-backcolor-dim-dark": "rgba(46, 46, 46, 1)",
            "--sjs-general-forecolor": "rgba(255, 255, 255, 0.78)",
            "--sjs-general-forecolor-light": "rgba(255, 255, 255, 0.42)",
            "--sjs-general-dim-forecolor": "rgba(255, 255, 255, 0.79)",
            "--sjs-general-dim-forecolor-light": "rgba(255, 255, 255, 0.45)",
            "--sjs-secondary-backcolor": "rgba(255, 152, 20, 1)",
            "--sjs-secondary-backcolor-light": "rgba(255, 152, 20, 0.1)",
            "--sjs-secondary-backcolor-semi-light": "rgba(255, 152, 20, 0.25)",
            "--sjs-secondary-forecolor": "rgba(48, 48, 48, 1)",
            "--sjs-secondary-forecolor-light": "rgba(48, 48, 48, 0.25)",
            "--sjs-shadow-small-reset": "0px 0px 0px 0px rgba(0, 0, 0, 0.35)",
            "--sjs-shadow-medium": "0px 2px 6px 0px rgba(0, 0, 0, 0.2)",
            "--sjs-shadow-large": "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
            "--sjs-shadow-inner-reset": "inset 0px 0px 0px 0px rgba(0, 0, 0, 0.2)",
            "--sjs-border-inside": "rgba(255, 255, 255, 0.08)",
            "--sjs-special-red-forecolor": "rgba(48, 48, 48, 1)",
            "--sjs-special-green": "rgba(36, 197, 164, 1)",
            "--sjs-special-green-light": "rgba(36, 197, 164, 0.1)",
            "--sjs-special-green-forecolor": "rgba(48, 48, 48, 1)",
            "--sjs-special-blue": "rgba(91, 151, 242, 1)",
            "--sjs-special-blue-light": "rgba(91, 151, 242, 0.1)",
            "--sjs-special-blue-forecolor": "rgba(48, 48, 48, 1)",
            "--sjs-special-yellow": "rgba(255, 152, 20, 1)",
            "--sjs-special-yellow-light": "rgba(255, 152, 20, 0.1)",
            "--sjs-special-yellow-forecolor": "rgba(48, 48, 48, 1)",
            "--sjs-general-backcolor-dim": colors.background,
            "--sjs-primary-backcolor": colors.primary,
            "--sjs-primary-backcolor-dark": "rgba(112, 196, 133, 1)",
            "--sjs-primary-backcolor-light": "rgba(112, 196, 133, 0.07)",
            "--sjs-primary-forecolor": "rgba(32, 32, 32, 1)",
            "--sjs-primary-forecolor-light": "rgba(32, 32, 32, 0.25)",
            "--sjs-special-red": "rgba(254, 76, 108, 1)",
            "--sjs-special-red-light": "rgba(254, 76, 108, 0.1)"
        },
        "headerView": "basic"
    });


    const handleSurveyComplete = (result) => {
        console.log('Survey Result:', result.data);
        onLogin();
        navigate('/'); // Redirect to home page after survey completion
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.background,
        },
        flexFiller: {
            paddingBottom: 1000,
        },
    });

    return (
        <View style={styles.container}>
            <Survey
                model={survey}
                onComplete={handleSurveyComplete}
            />
            <View style={styles.flexFiller}></View>
        </View>
    );
};


export default InfluencerSurveyScreen;