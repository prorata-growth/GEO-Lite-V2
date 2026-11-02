import type { ReactNode } from 'react';
import { type TagType } from '../Tag';
export interface TemplateCardStatus {
    label: string;
    type?: TagType;
}
export interface TemplateCardProps {
    title: string;
    /** e.g. "Using “Local Getaways: Homepage” default" */
    description?: string;
    status?: TemplateCardStatus;
    /** Preview thumbnail. Defaults to a decorative placeholder when omitted — pass a
        real screenshot/preview once one exists for this template. */
    thumbnail?: ReactNode;
    ctaLabel?: string;
    onCtaClick?: () => void;
    onMenuClick?: () => void;
    className?: string;
}
/** A template/widget-library card: thumbnail, title, status, description, and a CTA. */
export declare function TemplateCard({ title, description, status, thumbnail, ctaLabel, onCtaClick, onMenuClick, className, }: TemplateCardProps): import("react").JSX.Element;
