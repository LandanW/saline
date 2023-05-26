
export const FilesViewer = ({files, onBack, onOpen}) => {
  <table>
    <tbody>
      <tr onClick={onBack}>
        <td>🔙</td>
        <td>...</td>
        <td></td>
      </tr>
      {files.map(({name, directory, size}) => {
        return (
          <tr key={name} onClick={() => directory && onOpen(name)}>
            <td>{directory ? '📁' : '📄'}</td>
            <td>{name}</td>
            <td>{size}</td>
          </tr>
        )
      })}
    </tbody>
  </table>
}