function ConditionalRender(props: {children: React.ReactNode | React.ReactNode[], condition: boolean}) {
    if(props.condition) return props.children;
}

export default ConditionalRender;