const arrayReduce = (array, tipoTarifa) => {
    return array.reduce((anterior, atual, indice, array) => {
        if (atual.type === tipoTarifa) {
            var hasSome = anterior.some(row => {
                if (row.value === atual.value) {
                    row.range.push({
                        start: atual.startTime,
                        end: atual.endTime
                    })
                    return true;
                }
                return false;
            })

            if (hasSome) return anterior;

            return anterior.concat({
                value: atual.value,
                range: [
                    {
                        start: atual.startTime,
                        end: atual.endTime
                    }
                ]
            });
        } else {
            return anterior;
        }
    }, [])
};

var obj = {
    brancas: arrayReduce(temp1, 'Branca'),
    convencional: arrayReduce(temp1, 'Convencional')
}