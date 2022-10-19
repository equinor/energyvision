import React from 'react'

export const ExternalLinkRenderer: React.FC = ({ children }) => <span>{children}</span>

export const SubScriptRenderer: React.FC = ({ children }) => <sub>{children}</sub>

export const SuperScriptRenderer: React.FC = ({ children }) => <sup>{children}</sup>

export const StrikeThroughRenderer: React.FC = ({ children }) => <s>{children}</s>
