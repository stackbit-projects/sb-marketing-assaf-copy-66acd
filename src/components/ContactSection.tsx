import * as React from 'react';
import Markdown from 'markdown-to-jsx';
import classNames from 'classnames';
import { getComponent } from '@stackbit/components/dist/components-registry';
import { mapStylesToClassNames as mapStyles } from '@stackbit/components/dist/utils/map-styles-to-class-names';

export default function ContactSection(props) {
    const colors = props.colors || 'colors-a';
    const sectionStyles = props.styles?.self || {};
    const FormBlock = getComponent('FormBlock');
    return (
        <div
            id={props.elementId}
            className={classNames(
                'sb-component',
                'sb-component-section',
                'sb-component-contact-section',
                colors,
                'px-4',
                'sm:px-8',
                'h-96',
                sectionStyles.width ? mapMaxWidthStyles(sectionStyles.width) : null, // Make it and its background take up part of the page
                'mx-auto', // Center the mini contact form within the page
                sectionStyles.margin
            )}
            data-sb-field-path={props.annotationPrefix}
        >
            <div
                className={classNames(
                    'flex',
                    'flex-col',
                    'max-w-screen-2xl',
                    'mx-auto',
                    'relative',
                    sectionStyles.padding,
                    sectionStyles.alignItems ? mapStyles({ alignItems: sectionStyles.alignItems }) : null,
                    sectionStyles.justifyContent ? mapStyles({ justifyContent: sectionStyles.justifyContent }) : null
                )}
            >
                <div className={classNames('relative', 'w-full')}>
                    <div className={classNames('flex', '-mx-4', sectionStyles.flexDirection ? mapFlexDirectionStyles(sectionStyles.flexDirection) : null)}>
                        <div className="my-3 flex-1 px-4 w-full">
                            {contactBody(props)}
                            {props.form && (
                                <div className={classNames(props.title || props.text ? 'mt-8' : null)} data-sb-field-path=".form">
                                    <FormBlock {...props.form} />
                                </div>
                            )}
                        </div>
                        {props.feature && (
                            <div className="my-3 flex-1 px-4 w-full" data-sb-field-path=".feature">
                                {contactFeature(props.feature)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function contactFeature(feature) {
    const featureType = feature.type;
    if (!featureType) {
        throw new Error('contact section feature does not have the \'type\' property');
    }
    const Feature = getComponent(featureType);
    if (!Feature) {
        throw new Error(`no component matching the contact section feature type: ${featureType}`);
    }
    return <Feature {...feature} />;
}

function contactBody(props) {
    const styles = props.styles || {};
    return (
        <div>
            {props.title && (
                <h2 className={classNames('text-5xl', 'sm:text-6xl', styles.title ? mapStyles(styles.title) : null)} data-sb-field-path=".title">
                    {props.title}
                </h2>
            )}
            {props.text && (
                <Markdown
                    options={{ forceBlock: true, forceWrapper: true }}
                    className={classNames('sb-markdown', props.title ? 'mt-6' : null, styles.text ? mapStyles(styles.text) : null)}
                    data-sb-field-path=".text"
                >
                    {props.text}
                </Markdown>
            )}
        </div>
    );
}

function mapMaxWidthStyles(width) {
    switch (width) {
    case 'narrow':
        return 'max-w-screen-sm';
    case 'wide':
        return 'max-w-screen-lg';
    case 'full':
        return 'max-w-full';
    }
    return null;
}

function mapFlexDirectionStyles(flexDirection) {
    switch (flexDirection) {
    case 'row':
        return ['flex-col', 'lg:flex-row'];
    case 'row-reverse':
        return ['flex-col-reverse', 'lg:flex-row-reverse'];
    case 'col':
        return ['flex-col'];
    case 'col-reverse':
        return ['flex-col-reverse'];
    }
    return null;
}