exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('articles').del()
      .then(function () {
        // Inserts seed entries
        return knex('articles').insert([
          {id: 1, heading: 'Heading 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
          {id: 2, heading: 'Heading 2', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
          {id: 3, heading: 'Heading 3', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
        ]);
      });
  };