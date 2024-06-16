async function getData(id: number) {
    // This is a new event will not have an id
    if(id == 0) {
        // Return an empty event object
    } else {
        const res = await fetch('/event/' + id)

        if(!res.ok) {
            throw new Error('Error obtaining data for event')
        }
        
        return res.json
    }
}

export default async function Event({ params }: { params: { id: number } }) {
    const event = await getData(params.id);
    return (
        <h1>Event - {params.id} </h1>
    )
}