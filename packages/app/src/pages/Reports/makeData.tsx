export const makeData = (count: number) => {
  const columns = [];

  const data = [
    {
      id: "1",
      activity: "Stories",
    },
    {
      id: "2",
      activity: "Play",
      subRows: [
        {
          id: "3",
          activity: "Story Factory - Pre Reader",
        },
        {
          id: "4",
          activity: "Story Factory - Early Reader",
        },
      ],
    },
  ];

  for (let i = 0; i < count + 1; i++) {
    const studentId: string = `student-${i}`;

    const activitiesCompletedId: string = `${studentId}-activitiesCompleted`;
    const starsId: string = `${studentId}-stars`;
    const heartsId: string = `${studentId}-hearts`;

    columns.push({
      header: studentId,
      columns: [
        {
          accessorKey: activitiesCompletedId,
          header: "✅ 50",
        },
        {
          accessorKey: starsId,
          header: "⭐️ 100",
        },
        {
          accessorKey: heartsId,
          header: "️💜 30",
        },
      ],
    });

    for (let i: number = 0; i < data.length; i++) {
      // @ts-ignore
      data[i][activitiesCompletedId] = 10;
      // @ts-ignore
      data[i][starsId] = 20;
      // @ts-ignore
      data[i][heartsId] = 40;

      if (data[i].subRows) {
	// @ts-ignore
        for (let j: number = 0; j < data[i].subRows?.length; j++) {
	  // @ts-ignore
          data[i].subRows[j][activitiesCompletedId] = 10;
	  // @ts-ignore
          data[i].subRows[j][starsId] = 20;
	  // @ts-ignore
          data[i].subRows[j][heartsId] = 40;
        }
      }
    }
  }

  return { columns, data };
};
